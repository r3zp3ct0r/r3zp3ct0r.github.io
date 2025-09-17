import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, MapPin, FileText } from "lucide-react"
import { withBasePath } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="py-12 border-t border-muted bg-background/50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-medium">Mizar</h3>
            <p className="text-sm text-muted-foreground">
              Cybersecurity researcher, CTF player, Gamer, and Web Developer  based in Indonesia
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-muted-foreground hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="text-muted-foreground hover:text-foreground">
                  Experience
                </Link>
              </li>
              <li>
                <Link href={"/blog"} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <FileText className="w-4 h-4" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Connect</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="https://github.com/mzrismuarf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </Link>
              <Link
                href="https://twitter.com/mzrismuarf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/solderet/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </Link>
              {/* <Link
                href="mailto:mail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </Link> */}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">CTF Teams</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/TCP1P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                  TCP1P
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center border-t border-muted">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mizar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
