"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Github, Code, Trophy, Loader2, Star } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardPreview } from "@/components/dashboard-preview"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  const router = useRouter()
  const [usernames, setUsernames] = useState({
    github: "",
    leetcode: "",
    hackerrank: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isStarred, setIsStarred] = useState(false)

  const handleInputChange = (platform: keyof typeof usernames, value: string) => {
    setUsernames((prev) => ({
      ...prev,
      [platform]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Build query params
    const params = new URLSearchParams()
    if (usernames.github) params.append("github", usernames.github)
    if (usernames.leetcode) params.append("leetcode", usernames.leetcode)
    if (usernames.hackerrank) params.append("hackerrank", usernames.hackerrank)

    // Navigate to dashboard with query params
    setTimeout(() => {
      router.push(`/dashboard?${params.toString()}`)
    }, 1000) // Simulate data fetching with a short delay
  }

  const handleStarRepo = () => {
    // Toggle star status
    setIsStarred(!isStarred)
    
    // In a real app, you would make an API call to GitHub here
    if (!isStarred) {
      window.open("https://github.com/iShinzoo/Code-Track", "_blank")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl flex justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Code className="h-6 w-6 text-primary" />
            <span>CodeTrack</span>
          </div>
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleStarRepo}
                >
                  <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  <span>{isStarred ? "Star on GitHub" : "Star on GitHub"}</span>
                </Button>
              </li>
              <li>
                <ThemeToggle/>
              </li>
            </ul>

          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="container max-w-6xl px-4 py-12 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Track Your Coding Journey
                </h1>
                <p className="text-xl text-muted-foreground">
                  Monitor your progress across LeetCode, GitHub, HackerRank, and more in one unified dashboard.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Github className="h-5 w-5 text-purple-500" />
                  </div>
                  <span className="font-medium">GitHub</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <Code className="h-5 w-5 text-yellow-500" />
                  </div>
                  <span className="font-medium">LeetCode</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="font-medium">HackerRank</span>
                </div>
              </div>

              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-semibold">Enter your usernames</h2>
                    <p className="text-sm text-muted-foreground">
                      Provide your usernames for the platforms you want to track. We'll fetch real-time data from these
                      platforms.
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="github-username" className="flex items-center gap-2">
                          <Github className="h-4 w-4" />
                          GitHub Username
                        </Label>
                        <Input
                          id="github-username"
                          placeholder="e.g., octocat"
                          value={usernames.github}
                          onChange={(e) => handleInputChange("github", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="leetcode-username" className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          LeetCode Username
                        </Label>
                        <Input
                          id="leetcode-username"
                          placeholder="e.g., leetcoder"
                          value={usernames.leetcode}
                          onChange={(e) => handleInputChange("leetcode", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hackerrank-username" className="flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          HackerRank Username
                        </Label>
                        <Input
                          id="hackerrank-username"
                          placeholder="e.g., hacker123"
                          value={usernames.hackerrank}
                          onChange={(e) => handleInputChange("hackerrank", e.target.value)}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading || (!usernames.github && !usernames.leetcode && !usernames.hackerrank)}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Fetching Data...
                        </>
                      ) : (
                        <>
                          Generate Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl opacity-50" />
              <DashboardPreview className="relative z-10 scale-90 lg:scale-100" />
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container flex flex-col sm:flex-row py-6 w-full items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code className="h-4 w-4" />
            <p>© 2025 CodeTrack. All rights reserved.</p>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
