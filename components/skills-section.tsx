"use client"

import { motion } from "framer-motion"
import { Shield, Terminal, Server, Code, Database, Globe, Swords, Target, Bug, Lock, Zap, Award, Search, BookOpen } from "lucide-react"

const skills = [
  {
    category: "Red Team Core Skills",
    icon: <Swords className="w-6 h-6" />,
    subcategories: [
      {
        name: "Web Application Security",
        items: [
          "SQL Injection",
          "Cross-Site Scripting (XSS)",
          "Remote Code Execution (RCE) Exploitation",
          "PHP disable_functions Bypass Techniques",
          "Authentication & Authorization Bypass",
          "File Upload Security Bypass",
          "IDOR (Insecure Direct Object Reference)",
          "Cross-Site Request Forgery (CSRF)",
          "Security Misconfiguration Exploitation"
        ]
      },
      {
        name: "Penetration Testing Methodologies",
        items: [
          "Blackbox Penetration Testing",
          "Penetration Testing Execution Standard (PTES)",
          "OWASP Top 10 Assessment",
        ]
      },
    ]
  },
  {
    category: "PENETRATION TESTING TOOLS & TECHNOLOGIES",
    icon: <Target className="w-6 h-6" />,
    subcategories: [
      {
        name: "Primary Tools",
        items: [
          "Burp Suite",
          "OWASP ZAP",
          "Nmap",
          "SQLMap",
          "Metasploit Framework",
          "Kali Linux Environment",
          "Additional tools and technologies are utilized as needed depending on specific penetration testing requirements and target environments."
        ]
      },
      {
        name: "Custom Developed Tools",
        items: [
          "KEDEF - KODExplorer Credential Tester",
          "WormHole - Network Access Optimization",
          "ListSlicerDork - Advanced Target Filtering",
          "[Private Tools] - Specialized Vulnerability Scanners"
        ]
      }
    ]
  },
  {
    category: "Technical Foundations",
    icon: <Code className="w-6 h-6" />,
    subcategories: [
      {
        name: "Programming & Scripting",
        items: [
          // "Python - Security automation & exploit development",
          "Python",
          // "Bash - System administration & penetration testing",
          "Bash",
          // "PHP - Web application security research",
          "PHP",
          // "JavaScript - Client-side vulnerability analysis",
          "JavaScript",
          // "C++ - Low-level programming & performance optimization"
          "C++",
          "GO"
        ]
      },
      {
        name: "Operating Systems & Infrastructure",
        items: [
          "Linux",
          // "Linux (Advanced) - Primary penetration testing platform",
          "Windows",
          // "Windows - Target system understanding",
          "Docker",
          // "Docker - Containerized testing environments",
          "Virtual Machines",
          // "Virtual Machines - Isolated lab setups",
          "Web Servers (Apache, Nginx)"
          // "Web Servers (Apache, Nginx) - Attack surface analysis"
        ]
      }
    ]
  },
  {
    category: "Databases & Data Management",
    icon: <Database className="w-6 h-6" />,
    items: [
      "MySQL",
      // "MySQL - SQL injection techniques & database security",
      "PostgreSQL",
      // "PostgreSQL - Advanced database exploitation",
      "SQLite",
      // "SQLite - Lightweight database security testing",
      "NoSQL (MongoDB)"
      // "NoSQL (MongoDB) - Alternative database attack vectors"
    ],
  },
  {
    category: "CTF Competition Specializations",
    // category: "🏆 CTF Competition Specializations",
    icon: <Award className="w-6 h-6" />,
    items: [
      "Web Exploitation",
      // "Web Exploitation (Blackbox Methodology)",
      "OSINT",
      "Boot2Root",
      "Cryptography",
      // "Cryptography Challenge Solving",
      // "Boot2Root System Compromising",
      // "Miscellaneous Security Challenges",
      "Miscellaneous",
      "Digital Forensics",
      "Reverse Engineering (basic)"
      // "Digital Forensics Fundamentals"
    ],
  },
  {
    // category: "📊 Professional Security Practices",
    category: "Professional Security Practices",
    icon: <Shield className="w-6 h-6" />,
    items: [
      "CVSS Scoring & Risk Assessment",
      "Professional Penetration Testing Reports",
      "Executive Summary Presentations",
      "Technical Remediation Guidance",
      "Ethical Disclosure Procedures"
    ],
  },
  {
    // category: "🔵 Defensive Security Awareness",
    category: "Defensive Security Awareness",
    icon: <Lock className="w-6 h-6" />,
    items: [
      "Wazuh SIEM Implementation",
      "Security Monitoring Principles",
      "Incident Response Fundamentals",
      "Log Analysis Techniques",
      "Threat Hunting Basics"
    ],
  },
  {
    category: "Security Research & Development",
    // category: "🔬 Security Research & Development",
    icon: <Search className="w-6 h-6" />,
    items: [
      "Academic Research Collaboration",
      "Open Source Security Tool Contribution",
      "Vulnerability Discovery & Reporting",
      "Security Community Knowledge Sharing",
      "Continuous Learning & Skill Development"
    ],
  },
]

export function SkillsSection() {
  return (
    <div className="container px-4 py-16 mx-auto max-w-7xl" id="skills">
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-center">Skills & Expertise</h2>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
            className="p-8 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-sm">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground">{skill.category}</h3>
            </div>

            {skill.subcategories ? (
              <div className="space-y-6">
                {skill.subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className="space-y-3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-sm"></div>
                      <h4 className="font-semibold text-base text-foreground border-b border-primary/20 pb-1 flex-1">
                        {subcategory.name}
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 gap-2 pl-4">
                      {subcategory.items.map((item) => (
                        <div key={item} className="flex items-start gap-3 py-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-2" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {skill.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
