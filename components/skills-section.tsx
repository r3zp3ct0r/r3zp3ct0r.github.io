"use client"

import { motion } from "framer-motion"
import { Shield, Terminal, Server, Code, Database, Globe, Swords } from "lucide-react"

const skills = [
  {
    category: "Red Team",
    icon: <Swords className="w-6 h-6" />,
    items: ["Penetration Testing", "Vulnerability Assessment"],
  },
  {
    category: "Operating Systems",
    icon: <Terminal className="w-6 h-6" />,
    items: ["Linux", "Windows"],
  },
  {
    category: "Infrastructure",
    icon: <Server className="w-6 h-6" />,
    items: ["Docker", "Kubernetes","Networking"],
  },
  {
    category: "Programming",
    icon: <Code className="w-6 h-6" />,
    items: ["PHP", "Python", "JavaScript", "Bash"],
  },
  {
    category: "Databases",
    icon: <Database className="w-6 h-6" />,
    items: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
  },
  {
    category: "Web Technologies",
    icon: <Globe className="w-6 h-6" />,
    items: ["HTML/CSS", "React", "Node.js", "Web Security"],
  },
  {
    category: "SOC & Blue Team Tools",
    icon: <Shield className="w-6 h-6" />,
    items: [
      // "Wazuh", "Splunk", "ELK Stack", "Suricata", "Zeek", "OSSEC", "SIEM", "IDS/IPS", "Security Monitoring", "Incident Response"
      "Wazuh", "Security Monitoring", "Incident Response"

    ],
  },
]

export function SkillsSection() {
  return (
    <div className="container px-4 py-16 mx-auto max-w-7xl" id="skills">
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-center">Skills & Expertise</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
            className="p-6 rounded-lg bg-card min-h-[200px]"
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
