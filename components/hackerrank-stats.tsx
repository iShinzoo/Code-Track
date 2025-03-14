"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Trophy, Award, Medal, Star, FileCode } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchHackerRankStats } from "@/lib/api-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface HackerRankStatsProps {
  username: string
}

export function HackerRankStats({ username }: HackerRankStatsProps) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true)
        const data = await fetchHackerRankStats(username)
        setStats(data)
      } catch (err: any) {
        setError(err.message || "Failed to load HackerRank stats")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [username])

  if (loading) {
    return (
      <Card>
        <CardHeader className="bg-green-500 text-white">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            <h2 className="text-xl font-bold">HackerRank Stats</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="space-y-2 w-full max-w-md">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-lg" />
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !stats) {
    return (
      <Card>
        <CardHeader className="bg-green-500 text-white">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            <h2 className="text-xl font-bold">HackerRank Stats</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex justify-center items-center h-[300px]">
          <div className="text-center">
            <p className="text-muted-foreground">{error || `Could not load HackerRank stats for @${username}`}</p>
            <p className="text-sm mt-2">Please check the username and try again</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <CardHeader className="bg-green-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            <h2 className="text-xl font-bold">HackerRank Stats</h2>
          </div>
          <a
            href={stats.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm hover:underline"
          >
            @{stats.username}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b px-6 py-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-0 m-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6">
                {stats.avatarUrl && (
                  <img
                    src={stats.avatarUrl || "/placeholder.svg"}
                    alt={`${stats.username}'s avatar`}
                    className="w-24 h-24 rounded-full border-4 border-green-500/20"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold">{stats.name || stats.username}</h3>
                  <p className="text-muted-foreground">@{stats.username}</p>

                  <div className="flex gap-4 mt-3">
                    <div className="text-sm">
                      <span className="font-medium">Level:</span> {stats.level}
                    </div>
                    {stats.verified && (
                      <div className="text-sm flex items-center gap-1">
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          Verified
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Medal className="h-4 w-4 text-yellow-500" />
                    <span className="text-2xl font-bold">{stats.badges}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Badges</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="text-2xl font-bold">{stats.certifications.length}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Certifications</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <span className="text-2xl font-bold">{stats.skills.length}</span>
                  <span className="text-sm text-muted-foreground">Skills Verified</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <span className="text-2xl font-bold">{stats.points}</span>
                  <span className="text-sm text-muted-foreground">Points</span>
                </motion.div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.certifications.map((cert: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="p-4 border rounded-lg flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Award className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">{new Date(cert.date).toLocaleDateString()}</p>
                          <Badge variant="outline" className="text-xs">
                            Score: {cert.score}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Domain Scores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.domains.map((domain: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{domain.name}</h4>
                        <Badge>{domain.score} pts</Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="p-0 m-0">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Skill Proficiency</h3>
              <div className="space-y-6">
                {stats.skills.map((skill: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.level}/5</span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className={`h-2 
                          className={\`h-2 flex-1 rounded-full ${i < skill.level ? "bg-green-500" : "bg-muted"}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Skill Distribution</h3>
                <div className="h-64 flex items-end gap-4 justify-center">
                  {stats.skills.map((skill: any, index: number) => (
                    <motion.div
                      key={index}
                      className="relative flex flex-col items-center"
                      initial={{ height: 0 }}
                      animate={{ height: `${(skill.level / 5) * 100}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div
                        className="w-16 bg-green-500 rounded-t-md"
                        style={{ height: `${(skill.level / 5) * 100}%` }}
                      />
                      <span className="text-xs mt-2 text-center">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="p-0 m-0">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Submissions</h3>
              {stats.recentSubmissions && stats.recentSubmissions.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentSubmissions.map((submission: any, i: number) => (
                    <motion.div
                      key={i}
                      className="p-4 border rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{submission.challenge}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">{submission.date}</p>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <FileCode className="h-3 w-3" />
                              {submission.language}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{submission.score}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No recent submissions available</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

