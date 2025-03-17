import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import ThemeToggle from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Code Track',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
