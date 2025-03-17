import { Code, Github, Star } from "lucide-react"
import ThemeToggle from "./theme-toggle"

export function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-2 font-bold text-xl">
        <Code className="h-6 w-6 text-primary" />
        <span>CodeTrack</span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/iShinzoo/Code-Track"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          <span className="hidden sm:inline">View on GitHub</span>
        </a>
        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
          <Star className="h-3 w-3 fill-yellow-500" />
          <span>star it.</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
} 