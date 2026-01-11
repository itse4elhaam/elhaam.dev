"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function KeyboardNav() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [showShortcuts, setShowShortcuts] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.key) {
        case "?":
          setShowShortcuts(true);
          break;
        case "t":
          setTheme(theme === "dark" ? "light" : "dark");
          break;
        case "g":
          const handleNextKey = (ev: KeyboardEvent) => {
            if (ev.key === "h") {
              router.push("/");
            } else if (ev.key === "g") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            window.removeEventListener("keydown", handleNextKey);
          };
          window.addEventListener("keydown", handleNextKey);
          break;
        case "j":
          window.scrollBy({ top: 100, behavior: "smooth" });
          break;
        case "k":
          window.scrollBy({ top: -100, behavior: "smooth" });
          break;
        case "G":
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, setTheme, theme]);

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50 hidden md:flex items-center gap-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-md border border-border shadow-sm">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-primary" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h8l-1 4h4l-2 7 6-7h-4l1-4h-8z"/>
        </svg>
        <span className="font-medium">Vim shortcuts available • Press ? for help</span>
      </div>

      <Dialog open={showShortcuts} onOpenChange={setShowShortcuts}>
        <DialogContent className="[&>button]:hidden [&_[role=dialog]]:!duration-0 [&_[data-state]]:!duration-0"
          onAnimationStart={(e) => e.stopPropagation()}
          onAnimationEnd={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
            <DialogDescription>
              Navigate the site efficiently with these shortcuts.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Toggle Theme</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">t</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Go Home</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">g h</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scroll Down</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">j</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scroll Up</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">k</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Top of Page</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">g g</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bottom of Page</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">G</kbd>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="text-muted-foreground">Show Shortcuts</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">?</kbd>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
