"use client"

import { motion } from "framer-motion"
import { Shield, Terminal, Server, Code, Database, Globe, Swords, Target, Bug, Lock, Zap, Award, Search, BookOpen } from "lucide-react"

const skills = [
  {
    category: "🔴 Red Team Core Skills",
    icon: <Swords className="w-6 h-6" />,
    items: [
      "Advanced SQL Injection (Manual & Automated)",
      "Cross-Site Scripting (XSS) - Reflected, Stored, DOM",
      "Remote Code Execution (RCE) Exploitation",
      "PHP disable_functions Bypass Techniques",
      "Authentication & Authorization Bypass",
      "File Upload Security Bypass",
      "IDOR (Insecure Direct Object Reference)",
      "CSRF (Cross-Site Request Forgery)",
      "Security Misconfiguration Exploitation"
    ],
  },
  {
    category: "🛠️ Penetration Testing Arsenal",
    icon: <Target className="w-6 h-6" />,
    items: [
      "Burp Suite Professional",
      "OWASP ZAP",
      "Nmap & Ncat",
      "SQLMap",
      "Metasploit Framework",
      "Wireshark",
      "Kali Linux Environment",
      "Custom Developed Tools (KEDEF, WormHole, ListSlicerDork)"
    ],
  },
  {
    category: "💻 Technical Foundations",
    icon: <Code className="w-6 h-6" />,
    items: [
      "Python - Security automation & exploit development",
      "Bash - System administration & penetration testing",
      "PHP - Web application security research",
      "JavaScript - Client-side vulnerability analysis",
      "C++ - Low-level programming & performance optimization"
    ],
  },
  {
    category: "🖥️ Operating Systems & Infrastructure",
    icon: <Terminal className="w-6 h-6" />,
    items: [
      "Linux (Advanced) - Primary penetration testing platform",
      "Windows - Target system understanding",
      "Docker - Containerized testing environments",
      "Virtual Machines - Isolated lab setups",
      "Web Servers (Apache, Nginx) - Attack surface analysis"
    ],
  },
  {
    category: "🗄️ Databases & Data Management",
    icon: <Database className="w-6 h-6" />,
    items: [
      "MySQL - SQL injection techniques & database security",
      "PostgreSQL - Advanced database exploitation",
      "SQLite - Lightweight database security testing",
      "NoSQL (MongoDB) - Alternative database attack vectors"
    ],
  },
  {
    category: "🏆 CTF Competition Specializations",
    icon: <Award className="w-6 h-6" />,
    items: [
      "Web Exploitation (Blackbox Methodology)",
      "Cryptography Challenge Solving",
      "Boot2Root System Compromising",
      "Miscellaneous Security Challenges",
      "Digital Forensics Fundamentals"
    ],
  },
  {
    category: "📊 Professional Security Practices",
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
    category: "🔵 Defensive Security Awareness",
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
    category: "🔬 Security Research & Development",
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
            className="p-6 rounded-lg bg-card min-h-[250px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary">{skill.icon}</div>
              <h3 className="text-xl font-semibold min-h-[28px]">{skill.category}</h3>
            </div>

            <ul className="space-y-2">
              {skill.items.map((item) => (
                <li key={item} className="flex items-center gap-2 min-h-[24px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
