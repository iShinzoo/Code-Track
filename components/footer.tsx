import { Code } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container flex flex-col sm:flex-row py-6 w-full items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Code className="h-4 w-4" />
          <p>© 2025 CodeTrack. All rights reserved.</p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
} 