"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GitHubStats } from "@/components/github-stats"
import { LeetCodeStats } from "@/components/leetcode-stats"
import { HackerRankStats } from "@/components/hackerrank-stats"
import { fetchAllPlatformData } from "@/lib/api-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const githubUsername = searchParams.get("github") || ""
  const leetcodeUsername = searchParams.get("leetcode") || ""
  const hackerrankUsername = searchParams.get("hackerrank") || ""

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setErrors({})

        const result = await fetchAllPlatformData(githubUsername, leetcodeUsername, hackerrankUsername)

        // Check for platform-specific errors
        const newErrors: Record<string, string> = {}

        if (githubUsername && !result.github) {
          newErrors.github = `Could not fetch GitHub data for ${githubUsername}`
        }

        if (leetcodeUsername && !result.leetcode) {
          newErrors.leetcode = `Could not fetch LeetCode data for ${leetcodeUsername}`
        }

        if (hackerrankUsername && !result.hackerrank) {
          newErrors.hackerrank = `Could not fetch HackerRank data for ${hackerrankUsername}`
        }

        setErrors(newErrors)
        setData(result)
      } catch (error) {
        console.error("Error loading data:", error)
        setErrors({ general: "Failed to load data. Please try again." })
      } finally {
        setLoading(false)
      }
    }

    if (githubUsername || leetcodeUsername || hackerrankUsername) {
      loadData()
    } else {
      router.push("/")
    }
  }, [githubUsername, leetcodeUsername, hackerrankUsername, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </header>

      <main className="container max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Coding Dashboard</h1>
          <p className="text-muted-foreground">
            Tracking stats for {githubUsername && "GitHub"}
            {leetcodeUsername && (githubUsername ? ", LeetCode" : "LeetCode")}
            {hackerrankUsername && (githubUsername || leetcodeUsername ? ", HackerRank" : "HackerRank")}
          </p>
        </div>

        {errors.general && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errors.general}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[300px] gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Fetching real-time data from coding platforms...</p>
            </div>
          ) : (
            <>
              {githubUsername &&
                (errors.github ? (
                  <Alert variant="destructive">
                    <AlertTitle>GitHub Error</AlertTitle>
                    <AlertDescription>{errors.github}</AlertDescription>
                  </Alert>
                ) : (
                  data?.github && <GitHubStats username={githubUsername} />
                ))}

              {leetcodeUsername &&
                (errors.leetcode ? (
                  <Alert variant="destructive">
                    <AlertTitle>LeetCode Error</AlertTitle>
                    <AlertDescription>{errors.leetcode}</AlertDescription>
                  </Alert>
                ) : (
                  data?.leetcode && <LeetCodeStats username={leetcodeUsername} />
                ))}

              {hackerrankUsername &&
                (errors.hackerrank ? (
                  <Alert variant="destructive">
                    <AlertTitle>HackerRank Error</AlertTitle>
                    <AlertDescription>{errors.hackerrank}</AlertDescription>
                  </Alert>
                ) : (
                  data?.hackerrank && <HackerRankStats username={hackerrankUsername} />
                ))}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

