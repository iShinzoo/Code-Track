"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Stat {
  label: string
  value: string
}

interface PlatformCardProps {
  title: string
  username: string
  icon: ReactNode
  iconColor: string
  stats: Stat[]
  chart: ReactNode
}

export function PlatformCard({ title, username, icon, iconColor, stats, chart }: PlatformCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <CardHeader className={`flex flex-row items-center gap-4 ${iconColor} text-white`}>
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <span>@{username}</span>
          <ExternalLink className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b px-6 py-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-0 m-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                >
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="p-0 m-0">
            <div className="h-[300px]">{chart}</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

