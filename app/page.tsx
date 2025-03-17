"use client"

import type { ReactElement } from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Github, Code, Trophy, Loader2, Star, Award, BarChart } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardPreview } from "@/components/dashboard-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home(): ReactElement {
  const router = useRouter()
  const [usernames, setUsernames] = useState({
    github: "",
    leetcode: "",
    hackerrank: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isStarred, setIsStarred] = useState(false)

  useEffect(() => {
    // This effect ensures proper cleanup of any client-side operations
    return () => {
      setIsLoading(false)
    }
  }, [])

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
      setIsLoading(false)
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
    <div className="container max-w-6xl px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Coding Journey, All in One Place
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Connect your coding platforms, showcase your skills, and share your progress with the world.
        </motion.p>
      </div>

      <motion.div
        className="grid md:grid-cols-2 gap-12 items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div>
          <Tabs defaultValue="connect" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="connect">Connect Platforms</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>

            <TabsContent value="connect" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connect Your Coding Platforms</CardTitle>
                  <CardDescription>Enter your usernames for the platforms you want to track</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="github-username" className="flex items-center gap-2">
                          <Github className="h-4 w-4" />
                          GitHub Username
                        </Label>
                        <Input
                          id="github-username"
                          placeholder="e.g., iShinzoo"
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
                      disabled={isLoading || Object.values(usernames).every((v) => !v)}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Profile...
                        </>
                      ) : (
                        <>
                          Create My Coding Profile
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Use CodeTrack?</CardTitle>
                  <CardDescription>The ultimate platform to showcase your coding journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Unified Statistics</h3>
                      <p className="text-sm text-muted-foreground">
                        Track your progress across multiple coding platforms in one dashboard
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Language Proficiency</h3>
                      <p className="text-sm text-muted-foreground">
                        Visualize your programming language expertise based on your repositories and submissions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Achievement Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Showcase your badges, certifications, and accomplishments from all platforms
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Share className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Shareable Profiles</h3>
                      <p className="text-sm text-muted-foreground">
                        Generate beautiful cards and PDFs to share your coding journey with others
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl opacity-50" />
          <div className="relative">
            <ProfilePreview />
          </div>
        </div>
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

      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-10">Supported Platforms</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <PlatformCard
            name="GitHub"
            icon={<Github className="h-8 w-8" />}
            color="bg-gray-900"
            description="Track repositories, contributions, and stars"
          />
          <PlatformCard
            name="LeetCode"
            icon={<Code className="h-8 w-8" />}
            color="bg-yellow-500"
            description="Monitor problem-solving progress and contest ratings"
          />
          <PlatformCard
            name="HackerRank"
            icon={<Award className="h-8 w-8" />}
            color="bg-green-600"
            description="Showcase certifications and badges"
          />
          <PlatformCard
            name="CodeChef"
            icon={<Code className="h-8 w-8" />}
            color="bg-yellow-600"
            description="Display contest ratings and achievements"
          />
          <PlatformCard
            name="Codeforces"
            icon={<BarChart className="h-8 w-8" />}
            color="bg-blue-600"
            description="Track competitive programming progress"
          />
        </div>
      </div>
    </div>
  )
}

function Share(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}

function ChefHat(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <line x1="6" x2="18" y1="17" y2="17" />
    </svg>
  )
}

function PlatformCard({
  name,
  icon,
  color,
  description,
}: { name: string; icon: React.ReactNode; color: string; description: string }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center text-center">
      <div className={`${color} text-white p-4 rounded-full mb-3`}>{icon}</div>
      <h3 className="font-medium">{name}</h3>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </motion.div>
  )
}

function ProfilePreview() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-6 text-white">
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg?height=80&width=80"
            alt="Profile"
            className="rounded-full border-4 border-white/20 h-20 w-20 object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">@your_profile</h2>
            <p className="text-blue-100">Full Stack Developer</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">3+ Years Coding</div>
              <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">5 Platforms</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/40 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold">1,240</div>
            <div className="text-xs text-muted-foreground">Contributions</div>
          </div>
          <div className="bg-muted/40 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold">32</div>
            <div className="text-xs text-muted-foreground">Repositories</div>
          </div>
          <div className="bg-muted/40 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold">248</div>
            <div className="text-xs text-muted-foreground">Problems Solved</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>JavaScript</span>
              <span className="font-medium">65%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: "65%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>TypeScript</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "45%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Python</span>
              <span className="font-medium">30%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "30%" }} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
              GH
            </div>
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">
              LC
            </div>
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
              HR
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
              CF
            </div>
          </div>
          <Button size="sm" variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share Profile
          </Button>
        </div>
      </div>
    </div>
  )
}