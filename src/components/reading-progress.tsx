"use client";

import * as React from "react";

interface ReadingProgressProps {
  showTimeEstimate?: boolean;
  readingTime?: string;
}

export function ReadingProgress({ showTimeEstimate = true, readingTime }: ReadingProgressProps) {
  const [progress, setProgress] = React.useState(0);
  const [timeRemaining, setTimeRemaining] = React.useState("");

  React.useEffect(() => {
    let rafId: number;
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));

      if (showTimeEstimate && readingTime) {
        const totalMinutes = parseInt(readingTime.match(/\d+/)?.[0] || "5");
        const remainingMinutes = Math.ceil(totalMinutes * (1 - scrollPercent / 100));
        
        if (remainingMinutes > 0) {
          setTimeRemaining(`${remainingMinutes} min left`);
        } else {
          setTimeRemaining("Finished");
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [showTimeEstimate, readingTime]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-[1px] bg-muted">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {showTimeEstimate && timeRemaining && (
        <div className="fixed top-4 right-4 z-50 hidden md:block">
          <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 shadow-sm">
            <p className="text-xs font-mono text-muted-foreground">
              {timeRemaining}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
