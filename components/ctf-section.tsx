"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Trophy, Users, Award, ChevronDown, Star, Zap, ExternalLink, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useInView } from "react-intersection-observer"
import confetti from "canvas-confetti"
import Image from "next/image"

interface AchievementItem {
  title: string
  event: string
  team: string
  date: string
  icon: React.ReactElement
  points: number
  difficulty: "Legendary" | "Epic" | "Rare" | "Uncommon" | "Common"
  issuer?: string
}

const achievements: AchievementItem[] = [
  {
    title: "Best Writeup",
    event: "Cyber Specters CTF 2024",
    team: "Individual",
    date: "2024",
    icon: <Trophy className="w-6 h-6 text-yellow-500" />,
    points: 5000,
    difficulty: "Legendary",
  },
  {
    title: "4th Place",
    event: "Zero Byte CTF 2024",
    team: "Individual",
    date: "2024",
    icon: <Award className="w-6 h-6 text-gray-400" />,
    // issuer: "Patchstack",
    points: 4800,
    difficulty: "Epic",
  },
]

interface TeamItem {
  name: string
  role: string
  description: string
  link: string
  members: string
  specialties: string[]
  level?: string
}

const teams: TeamItem[] = [
  {
    name: "TCP1P",
    role: "Member",
    description: "TCP1P is Indonesian CTF community dedicated to organizing engaging Capture The Flag events and collaborating with local competitions. Our mission is to elevate the quality of CTF challenges in Indonesia and foster a thriving cybersecurity ecosystem through knowledge sharing.",
    link: "https://github.com/TCP1P",
    // level: "25",
    members: "-",
    specialties: ["Web Security", "Binary Exploitation", "Cryptography", "Forensics", "Reverse Engineering", "Blockchain", "OSINT", "Mobile Security"],
  },
  {
    name: "Anon Cyber Team (ACT) - Region Jawa Barat",
    role: "Member",
    description: "AnonCyberTeam adalah komunita IT Security Indonesia yang terbentuk tahun 2015 tepatnya tanggal 21 January. ACT komunitas IT Security yang membahas tentang Exploit , Web Developer , Network Infrasturktur , Dan juga kejahatan kejahatan dalam dunia internet. ",
    link: "",
    // level: "-",
    members: "-",
    specialties: ["Web Security", "Binary Exploitation", "Cryptography", "Forensics", "Reverse Engineering", "Blockchain", "OSINT", "Mobile Security"],
  },
]

export function CTFSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  useEffect(() => {
    if (titleInView) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const colors = ["#9c27b0", "#2196f3", "#ff5722"]

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const frame = () => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) return

        confetti({
          particleCount: 2,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0.2, 0.4) },
          colors: [colors[Math.floor(Math.random() * colors.length)]],
          zIndex: 100,
          disableForReducedMotion: true,
        })

        requestAnimationFrame(frame)
      }

      frame()
    }
  }, [titleInView])

  const handleAchievementClick = (index: number) => {
    if (selectedAchievement === index) {
      setSelectedAchievement(null)
    } else {
      setSelectedAchievement(index)

      // Trigger confetti for the selected achievement
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#FFA500", "#FF4500"],
        zIndex: 100,
        disableForReducedMotion: true,
      })
    }
  }

  const difficultyColors = {
    Legendary: "text-yellow-500 bg-yellow-500/20",
    Epic: "text-red-500 bg-red-500/20",
    Rare: "text-blue-500 bg-blue-500/20",
    Uncommon: "text-green-500 bg-green-500/20",
    Common: "text-gray-500 bg-gray-500/20",
  }

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-background overflow-x-hidden" id="ctf" ref={sectionRef}>
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYgMzBoLTZsMyAxMHoiLz4KICAgICAgICAgICAgPHBhdGggZD0iTTMwIDMwaC02bDMgMTB6Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')]"></div>
      </div>

      <div className="max-w-[90rem] mx-auto">
        <motion.div 
          style={{ opacity, y }} 
          className="relative z-10 w-full px-4 sm:px-6 lg:px-8"
        >
          <div className="mb-12 sm:mb-16 text-center" ref={titleRef}>
            <motion.h2
              initial={{ opacity: 0, y: -15 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight neon-text-pink"
            >
              CTF Achievements
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-base sm:text-lg text-muted-foreground"
            >
              Battle-tested in the digital arena
            </motion.p>
          </div>

          <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
            <div className="w-full">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-primary" />
                <h3 className="text-xl sm:text-2xl font-semibold neon-text">Achievement Board</h3>
              </div>

              <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 w-full">
                {achievements.slice(0, 6).map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleAchievementClick(index)}
                    className="cursor-pointer w-full min-w-0"
                  >
                    <Card className={`relative overflow-hidden ${selectedAchievement === index ? "ring-2 ring-primary" : ""}`}>
                      <CardHeader className="space-y-1 p-3 sm:p-4">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="shrink-0">{achievement.icon}</div>
                            <CardTitle className="text-base sm:text-lg truncate">
                              {achievement.title}
                            </CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${difficultyColors[achievement.difficulty as keyof typeof difficultyColors]} shrink-0 text-xs whitespace-nowrap`}
                          >
                            {achievement.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 pt-0">
                        <div className="space-y-1 text-sm min-w-0">
                          <div className="truncate break-words">
                            <strong className="text-muted-foreground">Event:</strong>{" "}
                            <span className="break-words">{achievement.event}</span>
                          </div>
                          <div className="truncate break-words">
                            <strong className="text-muted-foreground">Team:</strong>{" "}
                            <span className="break-words">{achievement.team}</span>
                          </div>
                        </div>

                        {selectedAchievement === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pt-2 mt-2 border-t border-muted min-w-0"
                          >
                            <div className="space-y-1 text-sm min-w-0">
                              <div className="truncate break-words">
                                <strong className="text-muted-foreground">Date:</strong>{" "}
                                <span className="break-words">{achievement.date}</span>
                              </div>
                              {achievement.issuer && (
                                <div className="truncate break-words">
                                  <strong className="text-muted-foreground">Issued by:</strong>{" "}
                                  <span className="break-words">{achievement.issuer}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1 mt-2">
                                <Zap className="w-3 h-3 text-yellow-500" />
                                <span className="text-yellow-500 text-xs">
                                  {achievement.points} XP
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4">
                <details className="group">
                  <summary className="flex items-center gap-2 px-4 py-2 cursor-pointer text-primary hover:underline bg-primary/10 rounded-lg">
                    <span>View more achievements</span>
                    <span className="transition-transform group-open:rotate-180">
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </summary>
                  <div className="grid gap-2 sm:gap-3 mt-4 grid-cols-1 sm:grid-cols-2 w-full">
                    {achievements.slice(6).map((achievement, index) => (
                      <Card key={index + 6} className="relative overflow-hidden">
                        <CardHeader className="space-y-1 p-3 sm:p-4">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <div className="shrink-0">{achievement.icon}</div>
                              <CardTitle className="text-base sm:text-lg truncate">
                                {achievement.title}
                              </CardTitle>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${difficultyColors[achievement.difficulty as keyof typeof difficultyColors]} shrink-0 text-xs whitespace-nowrap`}
                            >
                              {achievement.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-4 pt-0">
                          <div className="space-y-1 text-sm min-w-0">
                            <div className="truncate break-words">
                              <strong className="text-muted-foreground">Event:</strong>{" "}
                              <span className="break-words">{achievement.event}</span>
                            </div>
                            <div className="truncate break-words">
                              <strong className="text-muted-foreground">Team:</strong>{" "}
                              <span className="break-words">{achievement.team}</span>
                            </div>
                            <div className="truncate break-words">
                              <strong className="text-muted-foreground">Date:</strong>{" "}
                              <span className="break-words">{achievement.date}</span>
                            </div>
                            {achievement.issuer && (
                              <div className="truncate break-words">
                                <strong className="text-muted-foreground">Issued by:</strong>{" "}
                                <span className="break-words">{achievement.issuer}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 mt-2">
                              <Zap className="w-3 h-3 text-yellow-500" />
                              <span className="text-yellow-500 text-xs">
                                {achievement.points} XP
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </details>
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-xl sm:text-2xl font-semibold neon-text">CTF Guilds</h3>
              </div>

              <div className="space-y-4">
                {teams.slice(0, 3).map((team, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="w-full min-w-0"
                  >
                    <Card className="relative overflow-hidden">
                      <CardHeader className="space-y-1 p-3 sm:p-4">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 shrink-0">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <CardTitle className="text-base sm:text-lg truncate">{team.name}</CardTitle>
                              <CardDescription className="text-sm truncate">{team.role}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-primary/20 shrink-0">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="whitespace-nowrap">LVL {team.level}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 pt-0">
                        <p className="text-sm line-clamp-2 mb-3 break-words">{team.description}</p>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="p-2 text-center rounded-lg bg-muted/50">
                            <div className="text-xs text-muted-foreground">Members</div>
                            <div className="text-sm font-bold">{team.members}</div>
                          </div>
                          <div className="p-2 text-center rounded-lg bg-muted/50">
                            <div className="text-xs text-muted-foreground">Specialties</div>
                            <div className="text-sm font-bold">{team.specialties.length}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {team.specialties.map((specialty) => (
                            <Badge 
                              key={specialty} 
                              variant="secondary" 
                              className="bg-primary/20 hover:bg-primary/30 text-xs whitespace-nowrap"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <a href={team.link} target="_blank" rel="noopener noreferrer" className="mt-3 block w-full">
                          <Button
                            variant="outline"
                            className="w-full gap-2 text-sm border-primary/50 hover:border-primary hover:bg-primary/10"
                          >
                            View Guild
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4">
                <details className="group">
                  <summary className="flex items-center gap-2 px-4 py-2 cursor-pointer text-primary hover:underline bg-primary/10 rounded-lg">
                    <span>View more guilds</span>
                    <span className="transition-transform group-open:rotate-180">
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </summary>
                  <div className="space-y-4 mt-4">
                    {teams.slice(3).map((team, index) => (
                      <Card key={index + 3} className="relative overflow-hidden">
                        <CardHeader className="space-y-1 p-3 sm:p-4">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 shrink-0">
                                <Users className="w-5 h-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <CardTitle className="text-base sm:text-lg truncate">{team.name}</CardTitle>
                                <CardDescription className="text-sm truncate">{team.role}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-primary/20 shrink-0">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="whitespace-nowrap">LVL {team.level}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-4 pt-0">
                          <p className="text-sm line-clamp-2 mb-3">{team.description}</p>

                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="p-2 text-center rounded-lg bg-muted/50">
                              <div className="text-xs text-muted-foreground">Members</div>
                              <div className="text-sm font-bold">{team.members}</div>
                            </div>
                            <div className="p-2 text-center rounded-lg bg-muted/50">
                              <div className="text-xs text-muted-foreground">Specialties</div>
                              <div className="text-sm font-bold">{team.specialties.length}</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {team.specialties.map((specialty) => (
                              <Badge 
                                key={specialty} 
                                variant="secondary" 
                                className="bg-primary/20 hover:bg-primary/30 text-xs whitespace-nowrap"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>

                          <a href={team.link} target="_blank" rel="noopener noreferrer" className="mt-3 block w-full">
                            <Button
                              variant="outline"
                              className="w-full gap-2 text-sm border-primary/50 hover:border-primary hover:bg-primary/10"
                            >
                              View Guild
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          </div>

          <motion.div
            className="p-4 sm:p-6 mt-16 text-center rounded-lg bg-primary/5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
