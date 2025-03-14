"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Star, GitFork, Calendar, MapPin, Building, Twitter, LinkIcon } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchGitHubStats } from "@/lib/api-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface GitHubStatsProps {
  username: string
}

export function GitHubStats({ username }: GitHubStatsProps) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true)
        const data = await fetchGitHubStats(username)
        setStats(data)
      } catch (err: any) {
        setError(err.message || "Failed to load GitHub stats")
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
        <CardHeader className="bg-purple-500 text-white">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <h2 className="text-xl font-bold">GitHub Stats</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-2 w-full max-w-md">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-4 mt-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !stats) {
    return (
      <Card>
        <CardHeader className="bg-purple-500 text-white">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <h2 className="text-xl font-bold">GitHub Stats</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex justify-center items-center h-[300px]">
          <div className="text-center">
            <p className="text-muted-foreground">{error || `Could not load GitHub stats for @${username}`}</p>
            <p className="text-sm mt-2">Please check the username and try again</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <CardHeader className="bg-purple-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <h2 className="text-xl font-bold">GitHub Stats</h2>
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
              <TabsTrigger value="repositories">Repositories</TabsTrigger>
              <TabsTrigger value="languages">Languages</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-0 m-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6">
                <img
                  src={stats.avatarUrl || "/placeholder.svg?height=100&width=100"}
                  alt={`${stats.username}'s avatar`}
                  className="w-24 h-24 rounded-full border-4 border-purple-500/20"
                />
                <div>
                  <h3 className="text-xl font-bold">{stats.name || stats.username}</h3>
                  <p className="text-muted-foreground">@{stats.username}</p>

                  {stats.bio && <p className="mt-2 text-sm">{stats.bio}</p>}

                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="text-sm flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {new Date(stats.createdAt).toLocaleDateString()}</span>
                    </div>

                    {stats.location && (
                      <div className="text-sm flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{stats.location}</span>
                      </div>
                    )}

                    {stats.company && (
                      <div className="text-sm flex items-center gap-1">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{stats.company}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3">
                    {stats.blog && (
                      <a
                        href={stats.blog.startsWith("http") ? stats.blog : `https://${stats.blog}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 text-primary hover:underline"
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span>Website</span>
                      </a>
                    )}

                    {stats.twitterUsername && (
                      <a
                        href={`https://twitter.com/${stats.twitterUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 text-primary hover:underline"
                      >
                        <Twitter className="h-4 w-4" />
                        <span>@{stats.twitterUsername}</span>
                      </a>
                    )}
                  </div>

                  <div className="flex gap-4 mt-3">
                    <div className="text-sm">
                      <span className="font-medium">{stats.followers}</span> followers
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{stats.following}</span> following
                    </div>
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
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-2xl font-bold">{stats.stars}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Stars</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <span className="text-2xl font-bold">{stats.publicRepos}</span>
                  <span className="text-sm text-muted-foreground">Repositories</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <span className="text-2xl font-bold">{stats.commitFrequency.weekly}</span>
                  <span className="text-sm text-muted-foreground">Weekly Commits</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <span className="text-2xl font-bold">{stats.commitFrequency.monthly}</span>
                  <span className="text-sm text-muted-foreground">Monthly Commits</span>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="repositories" className="p-0 m-0">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Top Repositories</h3>
              <div className="space-y-4">
                {stats.topRepos.length > 0 ? (
                  stats.topRepos.map((repo: any, i: number) => (
                    <motion.div
                      key={i}
                      className="p-4 border rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:underline text-primary flex items-center gap-1"
                          >
                            {repo.name}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">
                            {repo.description || "No description provided"}
                          </p>
                          {repo.language && (
                            <Badge variant="outline" className="mt-2">
                              {repo.language}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>{repo.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="h-4 w-4" />
                            <span>{repo.forks}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No repositories found</p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="languages" className="p-0 m-0">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Language Distribution</h3>

              {stats.languages.length > 0 ? (
                <div className="space-y-4">
                  {stats.languages.map((lang: any, i: number) => {
                    const percentage =
                      (lang.count / stats.languages.reduce((sum: number, l: any) => sum + l.count, 0)) * 100
                    return (
                      <motion.div
                        key={i}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <div className="flex justify-between text-sm">
                          <span>{lang.name}</span>
                          <span className="font-medium">{lang.count} repos</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px]">
                  <p className="text-muted-foreground">No language data available</p>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Commit Activity</h3>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 52 * 7 }).map((_, i) => {
                    // This would be replaced with actual commit data
                    const intensity = Math.random()
                    let bgColor = "bg-muted"

                    if (intensity > 0.9) bgColor = "bg-purple-500"
                    else if (intensity > 0.7) bgColor = "bg-purple-500/70"
                    else if (intensity > 0.5) bgColor = "bg-purple-500/50"
                    else if (intensity > 0.3) bgColor = "bg-purple-500/30"

                    return (
                      <div
                        key={i}
                        className={`w-full aspect-square rounded-sm ${bgColor}`}
                        title={`${Math.floor(intensity * 10)} contributions`}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

