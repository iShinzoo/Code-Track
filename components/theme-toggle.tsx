"use client";

import { useTheme } from "./theme-provider";
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button variant="outline" size="sm" 
      className="flex items-center gap-1"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <><Moon size={16}/> Dark Theme</> : <><Sun size={16}/> Light Theme</>}
    </Button>
  );
}
