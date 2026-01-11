"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToggleTheme from "./toggle-theme";

export function SiteHeader() {
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith("/blog/")) {
    return null;
  }

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm pt-8 pb-4 transition-all duration-300">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="relative h-12 w-12 overflow-hidden rounded-full hover:opacity-90 transition-opacity"
          >
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
            className="text-4xl font-thin tracking-wide hover:text-foreground transition-colors duration-300"
          >
            Elhaam
          </Link>
        </div>

        <div className="flex items-center gap-3 relative">
          <span className="font-mono text-sm text-muted-foreground">
            The thoughtful engineering blog
          </span>

          <div className="absolute left-full ml-4">
            {mounted && <ToggleTheme />}
          </div>
        </div>
      </div>
    </header>
  );
}
