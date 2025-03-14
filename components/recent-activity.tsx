"use client"

import { motion } from "framer-motion"
import { Code, Github, Trophy } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      platform: "LeetCode",
      action: "Solved",
      item: "Two Sum (Easy)",
      time: "2 hours ago",
      icon: <Code className="h-4 w-4" />,
      iconBg: "bg-yellow-500",
    },
    {
      id: 2,
      platform: "GitHub",
      action: "Pushed to",
      item: "personal-website",
      time: "5 hours ago",
      icon: <Github className="h-4 w-4" />,
      iconBg: "bg-purple-500",
    },
    {
      id: 3,
      platform: "LeetCode",
      action: "Solved",
      item: "Valid Parentheses (Easy)",
      time: "Yesterday",
      icon: <Code className="h-4 w-4" />,
      iconBg: "bg-yellow-500",
    },
    {
      id: 4,
      platform: "HackerRank",
      action: "Earned badge",
      item: "Problem Solving (Intermediate)",
      time: "2 days ago",
      icon: <Trophy className="h-4 w-4" />,
      iconBg: "bg-green-500",
    },
    {
      id: 5,
      platform: "GitHub",
      action: "Created repository",
      item: "ai-project",
      time: "3 days ago",
      icon: <Github className="h-4 w-4" />,
      iconBg: "bg-purple-500",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          className="flex items-start gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className={`mt-0.5 rounded-full p-1.5 ${activity.iconBg}`}>{activity.icon}</div>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.platform}:</span> {activity.action}{" "}
              <span className="font-medium">{activity.item}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

