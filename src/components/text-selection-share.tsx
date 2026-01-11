"use client";

import { useState, useRef, useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { Share2 } from "lucide-react";

interface TextSelectionShareProps {
  children: React.ReactNode;
}

export function TextSelectionShare({ children }: TextSelectionShareProps) {
  const posthog = usePostHog();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [sharePosition, setSharePosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const selectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (posthog) {
      posthog.capture("$pageview", {
        path: "/",
        title: "Home - elhaam.dev",
      });
    }

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectedText(selection.toString());
        setSharePosition({
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY - 50,
        });
        setShowSharePopup(true);
      } else {
        setShowSharePopup(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [posthog]);

  const handleShare = () => {
    if (selectedText && posthog) {
      posthog.capture("text_shared", {
        content: selectedText.substring(0, 100),
        path: "/",
      });

      const url = window.location.href;
      const text = encodeURIComponent(`"${selectedText}" — elhaam.dev`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank");
      setShowSharePopup(false);
    }
  };

  return (
    <>
      <div ref={selectionRef}>
        {children}
      </div>
      {showSharePopup && (
        <button
          className="fixed bg-background/80 backdrop-blur-md border border-border/50 text-foreground px-4 py-2.5 rounded-full shadow-2xl z-50 cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:bg-background/95 hover:shadow-primary/10 flex items-center gap-2 animate-in fade-in zoom-in-95 slide-in-from-bottom-2"
          style={{ left: sharePosition.x, top: sharePosition.y, transform: 'translateX(-50%)' }}
          onClick={handleShare}
        >
          <Share2 className="h-3.5 w-3.5 text-primary" />
          <span className="text-sm font-medium tracking-tight">Share selection</span>
        </button>
      )}
    </>
  );
}
