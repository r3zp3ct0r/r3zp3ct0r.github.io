"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Twitter, Gamepad2, BookOpen, Shield, Code, Swords } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { TypeAnimation } from "react-type-animation"
import { useInView } from "react-intersection-observer"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"
import { withBasePath } from "@/lib/utils"

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("hacker")
  const [particlesContainer, setParticlesContainer] = useState<Engine | null>(null)
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine)
    setParticlesContainer(engine)
    setIsParticlesLoaded(true)
  }

  const tabs = [
    {
      id: "hacker",
      label: "Hacker",
      icon: <Swords className="w-5 h-5" />,
      color: "neon-text-red",
    },
    {
      id: "soc",
      label: "SOC",
      icon: <Shield className="w-5 h-5" />,
      color: "neon-text-cyan",
    },
    {
      id: "webdev",
      label: "Web Developer",
      icon: <Code className="w-5 h-5" />,
      color: "neon-text-green",
    },
  ]

  const tabContent = {
    hacker: {
      title: "Purple Team Specialist",
      subtitle: "Penetration Tester | CTF Player | Security Researcher",
      description:
        "Bridging the gap between offensive and defensive security. Exploring cybersecurity, web development, and CTF competitions to create secure digital solutions.",
      stats: [
        { label: "Years of Experience", value: "3+" },
        { label: "Security Tools", value: "2+" },
        // { label: "Web Projects", value: "20+" },
      ],
    },
    soc: {
      title: "SOC & Blue Team Analyst",
      subtitle: "Security Operations | Incident Response | Monitoring",
      description:
        "Specialized in security monitoring, threat detection, and incident response. Experienced with SIEM, IDS/IPS, and log analysis to protect digital assets.",
      stats: [
        { label: "Incidents Handled", value: "2" },
        { label: "SOC Tools Mastered", value: "1" },
        // { label: "SIEM Dashboards", value: "5+" },
      ],
    },
    webdev: {
      title: "Web Developer & Project Builder",
      subtitle: "Fullstack Developer | UI/UX Enthusiast | Automation",
      description:
        "Building modern, scalable, and secure web applications. Passionate about clean code, performance, and user experience.",
      stats: [
        { label: "Web Projects", value: "20+" },
        { label: "Frameworks Used", value: "10+" },
        { label: "Open Source", value: "5+" },
      ],
    },
  }

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-b from-black to-background"
      ref={containerRef}
      style={{ 
        minHeight: "100vh",
        width: "100%",
        padding: "2rem 0",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          width: "100%", 
          height: "100%",
          opacity: isParticlesLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: ["#a855f7", "#3b82f6", "#8b5cf6"],
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 1000,
                },
                value: 60,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0"
          style={{ 
            width: "100%", 
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        />
      </div>

      <motion.div 
        style={{ opacity, y }} 
        className="container relative z-10 mx-auto max-w-7xl h-full"
      >
        <div className="grid items-center h-full gap-8 px-4 lg:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 md:space-y-8"
            style={{ 
              minHeight: "auto",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/20 text-primary">
                <TypeAnimation
                  sequence={["Purple Team", 1000, "CTF Player", 1000, "Web Developer", 1000, "Security Researcher", 1000]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                />
              </div>

              <h1
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl glitch"
                data-text="Mizar"
              >
                <span
                  className={`${activeTab === "hacker" ? "neon-text-white" : ""}`}
                >
                  Mizar
                </span>
              </h1>

              <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground">
                {tabContent[activeTab as keyof typeof tabContent].subtitle}
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-muted-foreground">
              {tabContent[activeTab as keyof typeof tabContent].description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex p-1 space-x-1 rounded-full bg-muted">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium transition-all rounded-full ${
                      activeTab === tab.id
                        ? `${tab.color} bg-background text-primary shadow-lg`
                        : `hover:bg-background/50 text-muted-foreground`
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {tabContent[activeTab as keyof typeof tabContent].stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-3 text-center rounded-lg bg-background/50 backdrop-blur-sm"
                >
                  <div className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full gap-2 transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#blog" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-primary/50 hover:border-primary hover:bg-primary/10"
                >
                  Read My Blog
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2 sm:justify-start">
              <Link href="https://github.com/mzrismuarf" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="GitHub"
                  className="transition-transform hover:text-primary hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/mizarismuarief" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="LinkedIn"
                  className="transition-transform hover:text-primary hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com/mzrismuarf" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Twitter"
                  className="transition-transform hover:text-primary hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="mailto:mzrismuarf@gmail.com">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Email"
                  className="transition-transform hover:text-primary hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative hidden lg:flex"
            style={{ 
              height: "auto",
              minHeight: "500px",
              width: "100%",
              position: "relative",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {activeTab === "hacker" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-md p-6 rounded-lg retro-terminal scanlines">
                      <div className="mb-4 text-sm">
                        <span className="text-purple-400">root@mizar:~#</span>{" "}
                        <span className="cursor-blink">whoami</span>
                      </div>
                      <div className="mb-4">
                        <pre className="text-sm">
                          {`

                            ╱(㇏⌃•۵•⌃ノ)╲
 _____ ___         ___     _   ___     
| __  |_  |___ ___|_  |___| |_|   |___ 
|    -|_  |- _| . |_  |  _|  _| | |  _|
|__|__|___|___|  _|___|___|_| |___|_|  
              |_|                           
Purple Team | CTF Player | Web Developer
`}
                        </pre>
                      </div>
                      <div className="mb-4 text-sm">
                        <span className="text-purple-400">root@mizar:~#</span> ls -la skills/
                      </div>
                      <div className="mb-4 text-sm">
                        <pre>
                          {`
total 42
drwxr-xr-x  2 mizar mizar 4096 May 22 06:23 .
drwxr-xr-x 10 mizar mizar 4096 May 22 06:23 ..
-rwxr-xr-x  1 mizar mizar 8192 May 22 06:23 web_security.sh
-rwxr-xr-x  1 mizar mizar 6144 May 22 06:23 web_development.py
-rwxr-xr-x  1 mizar mizar 5120 May 22 06:23 penetration_testing.c
-rwxr-xr-x  1 mizar mizar 4096 May 22 06:23 blue_team.rb
-rwxr-xr-x  1 mizar mizar 3072 May 22 06:23 ctf_tools.go
`}
                        </pre>
                      </div>
                      <div className="text-sm">
                        <span className="text-purple-400">root@mizar:~#</span>{" "}
                        <span className="cursor-blink">./start_purple_team.sh</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "soc" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-900/60 to-blue-900/60">
                    <div className="w-full max-w-md p-6 rounded-lg bg-black/80 border border-cyan-400 shadow-lg">
                      <div className="mb-4 text-center">
                        <h3 className="mb-2 text-xl font-bold text-cyan-400">SOC DASHBOARD</h3>
                        <p className="text-cyan-200 text-sm">Security Monitoring & Incident Response</p>
                      </div>
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 justify-center text-xs">
                          <span className="px-2 py-1 bg-cyan-700/60 rounded-full text-white">Wazuh</span>
                          <span className="px-2 py-1 bg-blue-700/60 rounded-full text-white">Splunk</span>
                          <span className="px-2 py-1 bg-indigo-700/60 rounded-full text-white">ELK Stack</span>
                          <span className="px-2 py-1 bg-green-700/60 rounded-full text-white">Suricata</span>
                          <span className="px-2 py-1 bg-purple-700/60 rounded-full text-white">Zeek</span>
                          <span className="px-2 py-1 bg-gray-700/60 rounded-full text-white">OSSEC</span>
                          <span className="px-2 py-1 bg-yellow-700/60 rounded-full text-white">SIEM</span>
                          <span className="px-2 py-1 bg-red-700/60 rounded-full text-white">IDS/IPS</span>
                        </div>
                      </div>
                      <div className="mb-4 bg-cyan-900/40 rounded p-3 text-xs text-cyan-100 font-mono">
                        <div className="mb-1">[ALERT] Suspicious login detected from 10.10.10.10</div>
                        <div className="mb-1">[INFO] Wazuh agent updated on server-01</div>
                        <div className="mb-1">[WARNING] High CPU usage on SIEM node</div>
                        <div className="mb-1">[ALERT] Possible brute force attack detected</div>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center mt-2">
                        <span className="px-2 py-1 bg-cyan-800/80 rounded text-xs text-white">Incident Response</span>
                        <span className="px-2 py-1 bg-cyan-800/80 rounded text-xs text-white">Log Analysis</span>
                        <span className="px-2 py-1 bg-cyan-800/80 rounded text-xs text-white">Threat Hunting</span>
                        <span className="px-2 py-1 bg-cyan-800/80 rounded text-xs text-white">Security Monitoring</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "webdev" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-900/60 to-blue-900/60">
                    <div className="w-full max-w-md rounded-lg bg-white/90 border border-green-400 shadow-lg">
                      <div className="p-6">
                        <div className="mb-4 text-center">
                          <h3 className="mb-2 text-2xl font-bold text-green-700">PROJECT SHOWCASE</h3>
                        </div>
                        <div className="mb-6">
                          <p className="text-black text-sm mb-2">Recent Projects:</p>
                          <ul className="list-disc pl-5 text-black text-xs space-y-1">
                            <li>Point of Sale (POS) System - Laravel, MySQL, Tailwind</li>
                            <li>Personal Calendar App - PHP, JS, MySQL</li>
                            <li>E-Katalog Fotografer - Laravel, Blade, Bootstrap</li>
                            <li>Dynamic CV & Portfolio - PHP, Tailwind</li>
                            <li>Defacement Slot Detection - Laravel, Security</li>
                          </ul>
                        </div>
                        <div className="mb-4">
                          <p className="text-black text-sm mb-2">Favorite Stacks:</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-xs text-white bg-blue-500 rounded-full">Laravel</span>
                            <span className="px-2 py-1 text-xs text-white bg-yellow-500 rounded-full">Node.js</span>
                            <span className="px-2 py-1 text-xs text-white bg-purple-500 rounded-full">Tailwind CSS</span>
                            <span className="px-2 py-1 text-xs text-white bg-gray-700 rounded-full">MySQL</span>
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <span className="inline-block px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">npm run build</span>
                          <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full ml-2">Deploy: Success</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="#about">
            <Button variant="ghost" className="mb-8 animate-bounce" aria-label="Scroll down">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
