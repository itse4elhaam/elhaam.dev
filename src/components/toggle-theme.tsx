"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-muted w-7 h-7 text-muted-foreground hover:text-foreground border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-3.5 w-3.5 opacity-0 transition-all" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:bg-muted w-7 h-7 text-muted-foreground hover:text-foreground border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-3.5 w-3.5 text-yellow-500 transition-all" />
      ) : (
        <Moon className="h-3.5 w-3.5 text-slate-700 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
