"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle Component
 * Allows users to manually switch between Light and Dark modes.
 * Adheres to ARKDAR's sovereign brand aesthetics.
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
      <div className="w-10 h-10 border border-quiet opacity-20 animate-pulse layer-0" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-12 h-12 flex items-center justify-center layer-1 border border-quiet hover:bg-gold hover:text-black transition-all duration-cine group overflow-hidden"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative z-10 w-5 h-5 flex items-center justify-center">
        <Sun 
          className={`absolute inset-0 w-5 h-5 transition-all duration-cine ${
            isDark ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"
          }`} 
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-cine ${
            isDark ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"
          }`} 
        />
      </div>
    </button>
  );
}
