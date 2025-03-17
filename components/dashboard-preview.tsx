"use client"

import { motion } from "framer-motion"
import { Code, Github, Trophy } from "lucide-react"

interface DashboardPreviewProps {
  className?: string
}

export function DashboardPreview({ className = "" }: DashboardPreviewProps) {
  return (
    <motion.div className={`w-full z-[0] max-w-full rounded-lg border shadow-xl overflow-hidden bg-background ${className}`}>
      <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Code className="h-4 w-4 text-primary" />
          CodeTrack Dashboard
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
          Live Data
        </div>
      </div>

      <div className="p-4 grid gap-4">
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Coding Activity</h4>
            <span className="text-xs text-muted-foreground">Last 6 months</span>
          </div>
          <div className="h-32 flex items-end gap-1">
            {Array.from({ length: 26 }).map((_, i) => {
              const height = Math.random() * 100
              return <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${height}%` }} />
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Github className="h-4 w-4 text-purple-500" />
              </div>
              <h4 className="font-medium">GitHub</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Contributions</span>
                <span className="font-medium">1,024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Repositories</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Stars</span>
                <span className="font-medium">156</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Code className="h-4 w-4 text-yellow-500" />
              </div>
              <h4 className="font-medium">LeetCode</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Problems</span>
                <span className="font-medium">248</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-medium">1,842</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rank</span>
                <span className="font-medium">15,243</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <Trophy className="h-4 w-4 text-green-500" />
              </div>
              <h4 className="font-medium">HackerRank</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Badges</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Certificates</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Points</span>
                <span className="font-medium">1,450</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Code className="h-4 w-4 text-yellow-500" />
              </div>
              <h4 className="font-medium">CodeChef</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Problems</span>
                <span className="font-medium">248</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-medium">1,842</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rank</span>
                <span className="font-medium">15,243</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Code className="h-4 w-4 text-yellow-500" />
              </div>
              <h4 className="font-medium">CodeForces</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Problems</span>
                <span className="font-medium">248</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-medium">1,842</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rank</span>
                <span className="font-medium">15,243</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}