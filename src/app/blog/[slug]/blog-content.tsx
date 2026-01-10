"use client";

import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

interface BlogContentProps {
  htmlContent: string;
}

export default function BlogContent({ htmlContent }: BlogContentProps) {
  const posthog = usePostHog();

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
  }, [htmlContent, posthog]);

  return (
    <div className="prose-minimal" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
