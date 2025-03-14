"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface PlatformStatsProps {
  title: string
  value: string
  change: string
  period: string
  icon: React.ReactNode
}

export function PlatformStats({ title, value, change, period, icon }: PlatformStatsProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">{title}</span>
              <span className="text-2xl font-bold">{value}</span>
            </div>
            <div className="rounded-full bg-primary/10 p-2">{icon}</div>
          </div>
          <div className="mt-4 text-xs text-green-500">
            {change} {period}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

