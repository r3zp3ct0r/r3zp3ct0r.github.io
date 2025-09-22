"use client"

import { motion } from "framer-motion"
import { Shield, Bug, GitBranch, Code, BookOpen, Search, Award, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const notableAchievements = [
  {
    title: "7+ Critical Vulnerabilities Discovered",
    description: "Real-world systems including university and e-commerce platforms",
    icon: <Bug className="w-6 h-6 text-red-500" />,
    category: "Vulnerability Research",
    highlight: true,
  },
  {
    title: "RCE with Function Bypass",
    description: "Successfully bypassed PHP disable_functions (system, exec, shell_exec)",
    icon: <Code className="w-6 h-6 text-orange-500" />,
    category: "Advanced Exploitation",
    highlight: true,
  },
  {
    title: "Git Exposure Research",
    description: "Identified sensitive information disclosure on multiple Indonesian platforms",
    icon: <GitBranch className="w-6 h-6 text-blue-500" />,
    category: "Information Disclosure",
    highlight: true,
  },
  {
    title: "Custom Tool Development",
    description: "3 published GitHub tools with community adoption",
    icon: <Code className="w-6 h-6 text-green-500" />,
    category: "Tool Development",
    highlight: false,
  },
  {
    title: "Academic Research",
    description: "Defacement detection system with measurable security improvements",
    icon: <BookOpen className="w-6 h-6 text-purple-500" />,
    category: "Research & Development",
    highlight: false,
  },
]

const researchFocus = [
  {
    title: "Advanced Web Application Exploitation Techniques",
    description: "Researching new methods for identifying and exploiting web vulnerabilities",
    icon: <Target className="w-5 h-5" />,
  },
  {
    title: "Automated Vulnerability Discovery & Validation",
    description: "Developing tools for automated security testing and validation",
    icon: <Search className="w-5 h-5" />,
  },
  {
    title: "Custom Penetration Testing Tool Enhancement",
    description: "Improving existing tools and creating new specialized utilities",
    icon: <Code className="w-5 h-5" />,
  },
  {
    title: "CTF Challenge Creation & Security Education",
    description: "Creating educational content and challenges for the security community",
    icon: <Award className="w-5 h-5" />,
  },
  {
    title: "Ethical Hacking Methodology Optimization",
    description: "Refining penetration testing methodologies and best practices",
    icon: <Shield className="w-5 h-5" />,
  },
]

const knowledgeSharing = [
  {
    title: "CTF Write-ups",
    description: "Detailed technical solutions for complex security challenges",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Security Blogs",
    description: "Practical penetration testing insights and methodologies",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Tool Documentation",
    description: "Comprehensive guides for custom security utilities",
    icon: <Code className="w-5 h-5" />,
  },
  {
    title: "Community Contribution",
    description: "Open source security tool development and maintenance",
    icon: <GitBranch className="w-5 h-5" />,
  },
]

export function NotableAchievementsSection() {
  return (
    <div className="container px-4 py-16 mx-auto max-w-7xl" id="achievements">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">Notable Achievements</h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground">Key accomplishments and contributions in cybersecurity</p>
      </motion.div>

      {/* Notable Achievements */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-center">🏆 Key Accomplishments</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notableAchievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className={`h-full transition-all duration-300 ${achievement.highlight ? "border-primary/30 bg-primary/5" : ""}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {achievement.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {achievement.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {achievement.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current Research Focus */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-center">🔬 Current Research Focus</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {researchFocus.map((focus, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                      {focus.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{focus.title}</h4>
                      <p className="text-muted-foreground">{focus.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Knowledge Sharing */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-center">📝 Knowledge Sharing</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {knowledgeSharing.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="h-full text-center">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}




