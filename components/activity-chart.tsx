"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function ActivityChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Generate random data
    const data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 10)

    // Chart settings
    const padding = 20
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const dataMax = Math.max(...data)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, padding, 0, chartHeight + padding)
    gradient.addColorStop(0, "rgba(124, 58, 237, 0.1)")
    gradient.addColorStop(1, "rgba(124, 58, 237, 0)")

    // Draw line
    ctx.beginPath()
    ctx.moveTo(padding, chartHeight + padding - (data[0] / dataMax) * chartHeight)

    for (let i = 0; i < data.length; i++) {
      const x = padding + (i / (data.length - 1)) * chartWidth
      const y = chartHeight + padding - (data[i] / dataMax) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        // Create a smooth curve
        const prevX = padding + ((i - 1) / (data.length - 1)) * chartWidth
        const prevY = chartHeight + padding - (data[i - 1] / dataMax) * chartHeight

        const cpX1 = prevX + (x - prevX) / 3
        const cpX2 = prevX + ((x - prevX) * 2) / 3

        ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y)
      }
    }

    // Complete the path for the gradient fill
    ctx.lineTo(padding + chartWidth, chartHeight + padding)
    ctx.lineTo(padding, chartHeight + padding)
    ctx.closePath()

    // Fill with gradient
    ctx.fillStyle = gradient
    ctx.fill()

    // Reset path and draw the line
    ctx.beginPath()
    ctx.moveTo(padding, chartHeight + padding - (data[0] / dataMax) * chartHeight)

    for (let i = 0; i < data.length; i++) {
      const x = padding + (i / (data.length - 1)) * chartWidth
      const y = chartHeight + padding - (data[i] / dataMax) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        // Create a smooth curve
        const prevX = padding + ((i - 1) / (data.length - 1)) * chartWidth
        const prevY = chartHeight + padding - (data[i - 1] / dataMax) * chartHeight

        const cpX1 = prevX + (x - prevX) / 3
        const cpX2 = prevX + ((x - prevX) * 2) / 3

        ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y)
      }
    }

    // Style and stroke the line
    ctx.strokeStyle = "rgb(124, 58, 237)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    for (let i = 0; i < data.length; i++) {
      const x = padding + (i / (data.length - 1)) * chartWidth
      const y = chartHeight + padding - (data[i] / dataMax) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = "white"
      ctx.fill()
      ctx.strokeStyle = "rgb(124, 58, 237)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw x-axis labels (every 5 days)
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    for (let i = 0; i < data.length; i += 5) {
      const x = padding + (i / (data.length - 1)) * chartWidth
      ctx.fillText(`${i + 1}d`, x, chartHeight + padding + 15)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-[250px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}

