"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle Component
 * Allows users to manually switch between Light and Dark modes.
 * Adheres to ARKDAR's glassmorphism and brand aesthetics.
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid Hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-white/10 opacity-30 animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2.5 rounded-xl glass border border-white/5 hover:border-brand-primary/40 transition-all duration-300 group overflow-hidden"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative z-10 w-5 h-5 flex items-center justify-center">
        <Sun 
          className={`absolute inset-0 w-5 h-5 text-brand-primary transition-all duration-500 ${
            isDark ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"
          }`} 
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 text-brand-primary transition-all duration-500 ${
            isDark ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"
          }`} 
        />
      </div>
      
      {/* Dynamic Glow Effect for Dark Mode */}
      <div 
        className={`absolute inset-0 bg-brand-primary/10 opacity-0 transition-opacity duration-500 ${
          isDark ? "group-hover:opacity-100" : ""
        }`}
      />
    </button>
  );
}
