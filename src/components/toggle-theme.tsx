"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="fixed top-16 right-4 z-50 hidden md:block">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full hover:bg-muted w-9 h-9 text-muted-foreground hover:text-foreground border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-yellow-500 transition-all" />
        ) : (
          <Moon className="h-4 w-4 text-slate-700 transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
