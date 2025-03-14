"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Github, Globe, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ConnectPlatformsPage() {
  const [platforms, setPlatforms] = useState({
    leetcode: { connected: false, username: "" },
    github: { connected: false, username: "" },
    hackerrank: { connected: false, username: "" },
  })

  const handleConnect = (platform: keyof typeof platforms) => {
    setPlatforms((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        connected: true,
      },
    }))
  }

  const handleDisconnect = (platform: keyof typeof platforms) => {
    setPlatforms((prev) => ({
      ...prev,
      [platform]: {
        username: "",
        connected: false,
      },
    }))
  }

  const handleUsernameChange = (platform: keyof typeof platforms, value: string) => {
    setPlatforms((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        username: value,
      },
    }))
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold">Connect Platforms</h1>
        <p className="text-muted-foreground mt-2">
          Link your coding platform accounts to track your progress in one place.
        </p>
      </div>

      <div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>LeetCode</CardTitle>
                <CardDescription>Connect your LeetCode account to track your problem-solving progress.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="leetcode-username">LeetCode Username</Label>
                  <Input
                    id="leetcode-username"
                    placeholder="Enter your LeetCode username"
                    value={platforms.leetcode.username}
                    onChange={(e) => handleUsernameChange("leetcode", e.target.value)}
                    disabled={platforms.leetcode.connected}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {platforms.leetcode.connected ? (
                <>
                  <div className="flex items-center text-sm text-green-500">
                    <Check className="mr-1 h-4 w-4" />
                    Connected as {platforms.leetcode.username}
                  </div>
                  <Button variant="outline" onClick={() => handleDisconnect("leetcode")}>
                    Disconnect
                  </Button>
                </>
              ) : (
                <>
                  <div></div>
                  <Button onClick={() => handleConnect("leetcode")} disabled={!platforms.leetcode.username}>
                    Connect
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                <Github className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>GitHub</CardTitle>
                <CardDescription>Connect your GitHub account to track your contributions and activity.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github-username">GitHub Username</Label>
                  <Input
                    id="github-username"
                    placeholder="Enter your GitHub username"
                    value={platforms.github.username}
                    onChange={(e) => handleUsernameChange("github", e.target.value)}
                    disabled={platforms.github.connected}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {platforms.github.connected ? (
                <>
                  <div className="flex items-center text-sm text-green-500">
                    <Check className="mr-1 h-4 w-4" />
                    Connected as {platforms.github.username}
                  </div>
                  <Button variant="outline" onClick={() => handleDisconnect("github")}>
                    Disconnect
                  </Button>
                </>
              ) : (
                <>
                  <div></div>
                  <Button onClick={() => handleConnect("github")} disabled={!platforms.github.username}>
                    Connect
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>HackerRank</CardTitle>
                <CardDescription>Connect your HackerRank account to track your skill certifications.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hackerrank-username">HackerRank Username</Label>
                  <Input
                    id="hackerrank-username"
                    placeholder="Enter your HackerRank username"
                    value={platforms.hackerrank.username}
                    onChange={(e) => handleUsernameChange("hackerrank", e.target.value)}
                    disabled={platforms.hackerrank.connected}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {platforms.hackerrank.connected ? (
                <>
                  <div className="flex items-center text-sm text-green-500">
                    <Check className="mr-1 h-4 w-4" />
                    Connected as {platforms.hackerrank.username}
                  </div>
                  <Button variant="outline" onClick={() => handleDisconnect("hackerrank")}>
                    Disconnect
                  </Button>
                </>
              ) : (
                <>
                  <div></div>
                  <Button onClick={() => handleConnect("hackerrank")} disabled={!platforms.hackerrank.username}>
                    Connect
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <div className="mt-8 flex justify-end">
        <Link href="/dashboard">
          <Button size="lg">Save & Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}

