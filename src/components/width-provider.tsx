"use client";

import * as React from "react";

type Width = "narrow" | "wide";

interface WidthContextType {
  width: Width;
  toggleWidth: () => void;
}

const WidthContext = React.createContext<WidthContextType | undefined>(undefined);

export function WidthProvider({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = React.useState<Width>("narrow");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("site-width") as Width;
    if (saved) setWidth(saved);
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      document.documentElement.style.setProperty(
        "--site-width",
        width === "narrow" ? "56rem" : "80rem"
      );
      localStorage.setItem("site-width", width);
    }
  }, [width, mounted]);

  const toggleWidth = () => {
    setWidth((prev) => (prev === "narrow" ? "wide" : "narrow"));
  };

  return (
    <WidthContext.Provider value={{ width, toggleWidth }}>
      <div 
        style={{ "--site-width": width === "narrow" ? "56rem" : "80rem" } as React.CSSProperties}
        className="contents"
      >
        {children}
      </div>
    </WidthContext.Provider>
  );
}

export function useWidth() {
  const context = React.useContext(WidthContext);
  if (!context) throw new Error("useWidth must be used within WidthProvider");
  return context;
}
