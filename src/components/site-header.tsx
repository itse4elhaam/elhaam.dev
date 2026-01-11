"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hide header on blog post pages
  if (pathname?.startsWith("/blog/")) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm pt-8 pb-4 transition-all duration-300">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="relative h-12 w-12 overflow-hidden rounded-full hover:opacity-90 transition-opacity">
            <Image
              src="/dp.jpeg"
              alt="Elhaam"
              fill
              className="object-cover"
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-4xl font-bold tracking-wide hover:text-primary transition-colors duration-300"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Elhaam
          </Link>
        </div>
        
        <div className="flex items-center gap-3 relative">
          <span className="font-mono text-sm text-muted-foreground">
            The thoughtful engineering blog
          </span>
          
          <div className="absolute left-full ml-4">
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
