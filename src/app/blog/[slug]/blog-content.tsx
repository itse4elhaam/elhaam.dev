"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { usePostHog } from "posthog-js/react";
import { CopyCodeButton } from "@/components/copy-code-button";

interface BlogContentProps {
  htmlContent: string;
}

export default function BlogContent({ htmlContent }: BlogContentProps) {
  const posthog = usePostHog();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track article read
    if (posthog) {
      // Get article title from h1
      const titleMatch = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/);
      const title = titleMatch ? titleMatch[1] : "Unknown";

      posthog.capture("article_read", {
        title,
        content_length: htmlContent.length,
      });
    }

    // Add Copy Buttons to pre blocks
    if (contentRef.current) {
      const preElements = contentRef.current.querySelectorAll("pre");
      preElements.forEach((pre) => {
        // Check if button already exists to avoid duplicates
        if (pre.querySelector(".copy-code-btn-container")) return;

        // Ensure pre is relative so button can be absolute positioned
        if (getComputedStyle(pre).position === 'static') {
            pre.style.position = "relative";
        }
        
        // Create container for button
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "copy-code-btn-container absolute top-2 right-2 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100";
        // Make sure the pre has group class or we handle hover in CSS. 
        // Better: Make the button container visible on hover of pre via CSS or JS. 
        // Simpler: Just opacity-100 for now or rely on component style. 
        // The prompt said "Shows 'Copy' button on hover". 
        // I'll make the button handle its own styling, but the container placement is key.
        // Actually, let's make it always visible or handle hover via CSS class on container.
        // Adding 'group' class to pre might be hard if it comes from markdown.
        // I will add a class to pre.
        pre.classList.add("group");
        
        pre.appendChild(buttonContainer);

        // Get code text
        const codeElement = pre.querySelector("code");
        const codeText = codeElement ? codeElement.innerText : pre.innerText;

        // Render button
        const root = createRoot(buttonContainer);
        root.render(<CopyCodeButton code={codeText} />);
      });
    }
  }, [htmlContent, posthog]);

  return (
    <div 
      ref={contentRef}
      className="prose-minimal" 
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
}
