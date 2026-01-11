"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { WidthToggle } from "@/components/width-toggle";

export function SiteHeader() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm pt-8 pb-4 transition-all duration-300">
      <div className="w-full max-w-[var(--site-width)] mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-2 transition-[max-width] duration-300 ease-in-out">
        <Link
          href="/"
          className="font-bold text-2xl md:text-3xl tracking-tight hover:text-primary transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        >
          Elhaam Basheer Chaudhry
        </Link>
        
        <div className="flex items-center gap-3 relative">
          <span className="font-cursive text-2xl text-muted-foreground transform -rotate-[0.5deg]">
            A thoughtful engineering blog
          </span>
          
          <div className="absolute left-full ml-4 flex items-center gap-1">
            <WidthToggle />
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-muted w-8 h-8 text-muted-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-yellow-500 transition-all" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700 transition-all" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
