"use client";

import * as React from "react";

interface FullscreenContextType {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const FullscreenContext = React.createContext<FullscreenContextType>({
  isFullscreen: false,
  toggleFullscreen: () => {},
});

export function FullscreenProvider({ children }: { children: React.ReactNode }) {
  const [isFullscreen, setIsFullscreen] = React.useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fullscreen-mode");
      return stored === "true";
    }
    return false;
  });

  const toggleFullscreen = React.useCallback(() => {
    setIsFullscreen((prev) => {
      const newValue = !prev;
      localStorage.setItem("fullscreen-mode", String(newValue));
      return newValue;
    });
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "f") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFullscreen]);

  return (
    <FullscreenContext.Provider value={{ isFullscreen, toggleFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  );
}

export function useFullscreen() {
  const context = React.useContext(FullscreenContext);
  if (!context) {
    throw new Error("useFullscreen must be used within FullscreenProvider");
  }
  return context;
}
