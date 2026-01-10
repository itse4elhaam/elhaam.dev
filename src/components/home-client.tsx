"use client";

import { useState, useRef, useEffect } from "react";
import { usePostHog } from "posthog-js/react";

interface HomeClientProps {
  children: React.ReactNode;
}

export function HomeClient({ children }: HomeClientProps) {
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
          y: rect.top + window.scrollY - 40,
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
    }
  };

  return (
    <>
      <div ref={selectionRef}>
        {children}
      </div>
      {showSharePopup && (
        <button
          className="fixed bg-primary text-primary-foreground text-sm px-3 py-2 rounded-lg shadow-lg z-50 cursor-pointer transition-all duration-200 hover:opacity-90"
          style={{ left: sharePosition.x - 30, top: sharePosition.y }}
          onClick={handleShare}
        >
          Share
        </button>
      )}
    </>
  );
}
