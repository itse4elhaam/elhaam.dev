"use client";

import * as React from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWidth } from "@/components/width-provider";

export function WidthToggle() {
  const { width, toggleWidth } = useWidth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleWidth}
      className="rounded-full hover:bg-muted w-8 h-8 text-muted-foreground"
      title={width === "narrow" ? "Switch to wide view" : "Switch to narrow view"}
    >
      {width === "narrow" ? (
        <Maximize2 className="h-4 w-4" />
      ) : (
        <Minimize2 className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle width</span>
    </Button>
  );
}
