"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

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
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex h-24 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-muted hover:ring-primary transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shrink-0"
          >
            <Image
              src="/dp.jpeg"
              alt="Elhaam Basheer Chaudhry"
              fill
              className="object-cover"
              priority
            />
          </Link>
          <div className="flex flex-col justify-center">
            <Link
              href="/"
              className="font-bold text-xl tracking-tight hover:text-primary transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] leading-tight"
            >
              elhaam.dev
            </Link>
            <span className="font-cursive text-2xl text-muted-foreground -mt-1 transform -rotate-1 origin-left">
              A thoughtful engineering blog
            </span>
          </div>
        </div>

        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-muted w-10 h-10"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500 transition-all" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}
      </div>
    </header>
  );
}
