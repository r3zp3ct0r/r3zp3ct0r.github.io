require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Configuration
const NOTES_DIR = process.env.NOTES_DIR || "public/notes";
const NOTES_DATABASE_ID = process.env.NOTION_NOTES_DATABASE_ID;
const NOTION_TOKEN = process.env.NOTION_NOTES_TOKEN || process.env.NOTION_TOKEN;

if (!NOTES_DATABASE_ID || !NOTION_TOKEN) {
    console.error('❌ Missing required environment variables:');
    console.error('   NOTION_NOTES_DATABASE_ID:', !!NOTES_DATABASE_ID);
    console.error('   NOTION_TOKEN:', !!NOTION_TOKEN);
    process.exit(1);
}

// Initialize Notion client
const notion = new Client({
    auth: NOTION_TOKEN,
});

// Helper function to extract text from rich text
function extractTextFromRichText(richText) {
    if (!richText || !Array.isArray(richText)) return '';
    return richText.map(text => text.plain_text || '').join('');
}

// Helper function to extract excerpt from content blocks
function extractExcerpt(content, maxLength = 200) {
    if (!content || !Array.isArray(content)) return '';

    let excerpt = '';
    for (const block of content) {
        if (block.type === 'paragraph' && block.content && block.content.rich_text) {
            for (const textBlock of block.content.rich_text) {
                excerpt += textBlock.content || '';
                if (excerpt.length >= maxLength) break;
            }
            if (excerpt.length >= maxLength) break;
        }
    }

    return excerpt.length > maxLength ? excerpt.substring(0, maxLength).trim() + '...' : excerpt.trim();
}

// Helper function to estimate reading time
function estimateReadingTime(content) {
    if (!content || !Array.isArray(content)) return 0;

    let wordCount = 0;
    const countWords = (richText) => {
        if (!richText || !Array.isArray(richText)) return 0;
        return richText.reduce((count, text) => {
            const words = (text.content || '').split(/\s+/).filter(word => word.length > 0);
            return count + words.length;
        }, 0);
    };

    for (const block of content) {
        if (block.content && block.content.rich_text) {
            wordCount += countWords(block.content.rich_text);
        }
    }

    // Average reading speed: 200 words per minute
    return Math.ceil(wordCount / 200);
}

// Helper function to create slug from title
function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Helper function to get block content
async function getBlockContent(blockId) {
    try {
        const response = await notion.blocks.children.list({
            block_id: blockId,
            page_size: 100,
        });

        // Transform Notion API blocks to internal simplified format used by the app
        const mapRichText = (arr) => {
            if (!arr || !Array.isArray(arr)) return []
            return arr.map((rt) => ({
                type: rt.type || 'text',
                content: rt.plain_text || '',
                annotations: {
                    bold: !!rt.annotations?.bold,
                    italic: !!rt.annotations?.italic,
                    strikethrough: !!rt.annotations?.strikethrough,
                    underline: !!rt.annotations?.underline,
                    code: !!rt.annotations?.code,
                    color: rt.annotations?.color || 'default',
                },
                href: rt.href || undefined,
            }))
        }

        const transformBlock = (block) => {
            const base = {
                id: block.id,
                type: block.type,
                created_time: block.created_time,
                last_edited_time: block.last_edited_time,
                has_children: !!block.has_children,
                archived: !!block.archived,
                content: {},
            }

            const b = block[block.type] || {}

            switch (block.type) {
                case 'paragraph':
                    base.content.rich_text = mapRichText(b.rich_text)
                    break
                case 'heading_1':
                case 'heading_2':
                case 'heading_3':
                    base.content.rich_text = mapRichText(b.rich_text)
                    break
                case 'bulleted_list_item':
                case 'numbered_list_item':
                    base.content.rich_text = mapRichText(b.rich_text)
                    break
                case 'code':
                    base.content.rich_text = mapRichText(b.rich_text)
                    base.content.language = b.language || ''
                    break
                case 'quote':
                    base.content.rich_text = mapRichText(b.rich_text)
                    break
                case 'divider':
                    // no extra content
                    break
                case 'image':
                    base.content.url = (b.type === 'file' ? b.file?.url : b.external?.url) || ''
                    base.content.caption = mapRichText(b.caption)
                    break
                case 'embed':
                    base.content.url = b.url || ''
                    break
                case 'bookmark':
                    base.content.url = b.url || ''
                    break
                case 'file':
                case 'pdf':
                    base.content.url = (b.type === 'file' ? b.file?.url : b.external?.url) || ''
                    base.content.name = b.caption?.[0]?.plain_text || 'File'
                    base.content.size = b.size || undefined
                    break
                case 'video':
                    base.content.url = (b.type === 'file' ? b.file?.url : b.external?.url) || ''
                    break
                case 'toggle':
                    base.content.rich_text = mapRichText(b.rich_text)
                    break
                case 'table':
                    base.content.has_column_header = !!b.has_column_header
                    base.content.has_row_header = !!b.has_row_header
                    // children handled separately if needed
                    break
                default:
                    // leave as is for unhandled types
                    break
            }

            return base
        }

        const transformed = response.results.map(transformBlock)
        return transformed;
    } catch (error) {
        console.error(`Error fetching block content for ${blockId}:`, error);
        return [];
    }
}

// Main function to generate notes content
async function generateNotesContent() {
    try {
        console.log('🚀 Starting notes content generation...');
        console.log(`📁 Notes directory: ${NOTES_DIR}`);
        console.log(`🗄️  Database ID: ${NOTES_DATABASE_ID}`);

        // Create notes directory if it doesn't exist
        if (!fs.existsSync(NOTES_DIR)) {
            fs.mkdirSync(NOTES_DIR, { recursive: true });
        }

        // Query the Notion database
        const response = await notion.databases.query({
            database_id: NOTES_DATABASE_ID,
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true
                }
            },
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'descending'
                }
            ]
        });

        console.log(`📊 Found ${response.results.length} published notes`);

        const notes = [];
        const categories = new Set();
        const tags = new Set();

        for (const page of response.results) {
            try {
                console.log(`📝 Processing: ${page.properties.Title?.title?.[0]?.plain_text || 'Untitled'}`);

                // Extract properties
                const title = extractTextFromRichText(page.properties.Title?.title) || 'Untitled';
                const slug = extractTextFromRichText(page.properties.Slug?.rich_text) || createSlug(title);
                const excerpt = extractTextFromRichText(page.properties.Excerpt?.rich_text) || '';
                const featuredImage = page.properties['Featured Image']?.url || '';
                const published = page.properties.Published?.checkbox || false;
                const featured = page.properties.Featured?.checkbox || false;
                const author = extractTextFromRichText(page.properties.Author?.rich_text) || 'Unknown';
                const publicUrl = page.properties['Public URL']?.url || '';

                // Extract categories
                const noteCategories = page.properties.Categories?.multi_select?.map(cat => cat.name) || [];
                noteCategories.forEach(cat => categories.add(cat));

                // Extract tags
                const noteTags = page.properties.Tags?.multi_select?.map(tag => tag.name) || [];
                noteTags.forEach(tag => tags.add(tag));

                // Get page content
                const content = await getBlockContent(page.id);

                // Extract excerpt from content if not provided
                const finalExcerpt = excerpt || extractExcerpt(content);

                // Calculate reading time
                const readingTime = estimateReadingTime(content);

                const note = {
                    id: page.id,
                    title,
                    slug,
                    folder: slug,
                    excerpt: finalExcerpt,
                    featured_image: featuredImage,
                    created_time: page.created_time,
                    last_edited_time: page.last_edited_time,
                    reading_time: readingTime,
                    url: `/notes/${slug}`,
                    public_url: publicUrl,
                    archived: page.archived,
                    categories: noteCategories,
                    tags: noteTags,
                    properties: {
                        published,
                        featured,
                        author
                    },
                    content: content
                };

                notes.push(note);

                // Create individual note file
                const noteDir = path.join(NOTES_DIR, slug);
                if (!fs.existsSync(noteDir)) {
                    fs.mkdirSync(noteDir, { recursive: true });
                }

                const noteFile = path.join(noteDir, 'post.json');
                fs.writeFileSync(noteFile, JSON.stringify({
                    post: {
                        ...note,
                        content: content
                    }
                }, null, 2));

                console.log(`✅ Created: ${noteFile}`);

            } catch (error) {
                console.error(`❌ Error processing page ${page.id}:`, error);
            }
        }

        // Generate notes index
        const notesIndex = {
            meta: {
                generated_at: new Date().toISOString(),
                total_posts: notes.length,
                published_posts: notes.filter(n => n.properties.published).length,
                draft_posts: 0,
                featured_posts: notes.filter(n => n.properties.featured).length,
                total_tags: tags.size,
                total_categories: categories.size,
                posts_directory: NOTES_DIR
            },
            taxonomy: {
                categories: Array.from(categories).map(cat => ({
                    name: cat,
                    count: notes.filter(n => n.categories.includes(cat)).length,
                    slug: createSlug(cat)
                })),
                tags: Array.from(tags).map(tag => ({
                    name: tag,
                    count: notes.filter(n => n.tags.includes(tag)).length,
                    slug: createSlug(tag)
                }))
            },
            posts: {
                all: notes
            }
        };

        // Write notes index
        const indexFile = path.join(NOTES_DIR, 'index.json');
        fs.writeFileSync(indexFile, JSON.stringify(notesIndex, null, 2));

        // Write public notes index for client-side fetching
        const publicIndexFile = path.join('public', 'notes-index.json');
        fs.writeFileSync(publicIndexFile, JSON.stringify(notesIndex, null, 2));

        console.log('✅ Notes content generation completed!');
        console.log(`📊 Generated ${notes.length} notes`);
        console.log(`📁 Index file: ${indexFile}`);
        console.log(`🌐 Public index: ${publicIndexFile}`);

    } catch (error) {
        console.error('❌ Error generating notes content:', error);
        process.exit(1);
    }
}

// Run the script
generateNotesContent();
