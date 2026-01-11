"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const VimLogo = () => (
  <svg className="h-2.5 w-2.5" viewBox="0 0 544.8 544.8" fill="currentColor">
    <path d="M0 0v544.8h544.8V0H0zm164.5 72.6h47.7l89.4 173.4V72.6h44.5v210.8h-47.7L209 109.2v174.2h-44.5V72.6zm271.1 210.8h-44.5V72.6h44.5v210.8zM72.6 120.3l44.5-47.7v210.8H72.6V120.3zm0 216.7h399.6v135.2H72.6V337z"/>
  </svg>
);

export function KeyboardNav() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [showShortcuts, setShowShortcuts] = React.useState(false);
  const lastScrollTimeRef = React.useRef(0);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        case "k": {
          const now = Date.now();
          const timeSinceLastScroll = now - lastScrollTimeRef.current;
          const isRepeating = timeSinceLastScroll < 150;
          lastScrollTimeRef.current = now;
          
          const direction = e.key === "j" ? 1 : -1;
          window.scrollBy({ 
            top: 150 * direction, 
            behavior: isRepeating ? "instant" : "smooth" 
          });
          break;
        }
        case "G":
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, setTheme, theme]);

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50 hidden md:flex items-center gap-1.5 text-[10px] text-muted-foreground/60 bg-background/60 backdrop-blur-sm px-2 py-1 rounded border border-border/50">
        <VimLogo />
        <span>?</span>
      </div>

      <Dialog open={showShortcuts} onOpenChange={setShowShortcuts}>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
            <DialogDescription>
              Navigate the site efficiently with these shortcuts.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Toggle Theme</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">
                t
              </kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Go Home</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">
                g h
              </kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scroll Down</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">
                j
              </kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scroll Up</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">
                k
              </kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Top of Page</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">
                g g
              </kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bottom of Page</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">
                G
              </kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fullscreen</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">
                f
              </kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Show Shortcuts</span>
              <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">
                ?
              </kbd>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
