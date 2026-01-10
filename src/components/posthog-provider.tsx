"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    bootstrap: typeof window !== "undefined" && window.POSTHOG_BOOTSTRAP ? window.POSTHOG_BOOTSTRAP : undefined,
  });
}

export function PostHogClientProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

// Declare bootstrap data on window
declare global {
  interface Window {
    POSTHOG_BOOTSTRAP?: Record<string, unknown>;
  }
}
