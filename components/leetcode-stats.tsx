"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Code, Award, BarChart, CheckCircle, Clock, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchLeetCodeStats } from "@/lib/api-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface LeetCodeStatsProps {
  username: string
}

export function LeetCodeStats({ username }: LeetCodeStatsProps) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true)
        const data = await fetchLeetCodeStats(username)
        setStats(data)
      } catch (err: any) {
        setError(err.message || "Failed to load LeetCode stats")
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
        <CardHeader className="bg-yellow-500 text-white">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <h2 className="text-xl font-bold">LeetCode Stats</h2>
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

            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
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
        <CardHeader className="bg-yellow-500 text-white">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <h2 className="text-xl font-bold">LeetCode Stats</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex justify-center items-center h-[300px]">
          <div className="text-center">
            <p className="text-muted-foreground">{error || `Could not load LeetCode stats for @${username}`}</p>
            <p className="text-sm mt-2">Please check the username and try again</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <CardHeader className="bg-yellow-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <h2 className="text-xl font-bold">LeetCode Stats</h2>
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
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="contests">Contests</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-0 m-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6">
                {stats.avatarUrl && (
                  <img
                    src={stats.avatarUrl || "/placeholder.svg"}
                    alt={`${stats.username}'s avatar`}
                    className="w-24 h-24 rounded-full border-4 border-yellow-500/20"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold">{stats.realName || stats.username}</h3>
                  <p className="text-muted-foreground">@{stats.username}</p>

                  {stats.aboutMe && <p className="mt-2 text-sm">{stats.aboutMe}</p>}

                  <div className="flex gap-4 mt-3">
                    <div className="text-sm">
                      <span className="font-medium">Ranking:</span> {stats.ranking}
                    </div>
                    {stats.reputation && (
                      <div className="text-sm">
                        <span className="font-medium">Reputation:</span> {stats.reputation}
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
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-2xl font-bold">{stats.totalSolved}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Problems Solved</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-2xl font-bold">{stats.contestRating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Contest Rating</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <span className="text-2xl font-bold">{stats.contestRanking}</span>
                  <span className="text-sm text-muted-foreground">Global Ranking</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <span className="text-2xl font-bold">{stats.acceptanceRate}</span>
                  <span className="text-sm text-muted-foreground">Acceptance Rate</span>
                </motion.div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Problem Difficulty Distribution
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Easy</span>
                      <span className="font-medium">
                        {stats.easySolved}/{stats.totalProblems.easy}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(stats.easySolved / stats.totalProblems.easy) * 100}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.easySolved / stats.totalProblems.easy) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Medium</span>
                      <span className="font-medium">
                        {stats.mediumSolved}/{stats.totalProblems.medium}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${(stats.mediumSolved / stats.totalProblems.medium) * 100}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.mediumSolved / stats.totalProblems.medium) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Hard</span>
                      <span className="font-medium">
                        {stats.hardSolved}/{stats.totalProblems.hard}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${(stats.hardSolved / stats.totalProblems.hard) * 100}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.hardSolved / stats.totalProblems.hard) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {stats.badges && stats.badges.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-4">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {stats.badges.slice(0, 8).map((badge: any, i: number) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1">
                        {badge.displayName}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="problems" className="p-0 m-0">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Problem Solving Stats</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <h4 className="font-medium">Easy Problems</h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{stats.easySolved}</span>
                    <span className="text-sm text-muted-foreground">
                      {((stats.easySolved / stats.totalProblems.easy) * 100).toFixed(1)}% completed
                    </span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-yellow-500" />
                    <h4 className="font-medium">Medium Problems</h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{stats.mediumSolved}</span>
                    <span className="text-sm text-muted-foreground">
                      {((stats.mediumSolved / stats.totalProblems.medium) * 100).toFixed(1)}% completed
                    </span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    <h4 className="font-medium">Hard Problems</h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{stats.hardSolved}</span>
                    <span className="text-sm text-muted-foreground">
                      {((stats.hardSolved / stats.totalProblems.hard) * 100).toFixed(1)}% completed
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Recent Submissions</h3>
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground">
                    Recent submissions would be displayed here if available from the API
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contests" className="p-0 m-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                <div className="w-full md:w-1/3 p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Contest Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rating</span>
                      <span className="font-medium">{stats.contestRating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Global Ranking</span>
                      <span className="font-medium">{stats.contestRanking}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Contests Attended</span>
                      <span className="font-medium">{stats.contestsAttended}</span>
                    </div>
                    {stats.topPercentage && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Top Percentage</span>
                        <span className="font-medium">{stats.topPercentage}%</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-2/3">
                  <h3 className="text-lg font-medium mb-4">Recent Contests</h3>
                  {stats.recentContests && stats.recentContests.length > 0 ? (
                    <div className="space-y-4">
                      {stats.recentContests.map((contest: any, i: number) => (
                        <motion.div
                          key={i}
                          className="p-4 border rounded-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{contest.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">{contest.date}</p>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline">
                                  Solved: {contest.solved}/{contest.total}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" />
                                  Rating: {contest.rating}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Rank: {contest.ranking}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No contest history available</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

