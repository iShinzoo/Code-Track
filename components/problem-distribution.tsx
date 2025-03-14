"use client"

import { motion } from "framer-motion"

export function ProblemDistribution() {
  const data = [
    { label: "Easy", value: 120, color: "bg-green-500" },
    { label: "Medium", value: 85, color: "bg-yellow-500" },
    { label: "Hard", value: 43, color: "bg-red-500" },
  ]

  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <div className="space-y-4">
      <div className="flex h-4 rounded-full overflow-hidden">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className={`${item.color}`}
            style={{ width: `${(item.value / total) * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${(item.value / total) * 100}%` }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

