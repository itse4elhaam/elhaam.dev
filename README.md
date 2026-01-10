# elhaam.dev

A thoughtful engineering blog by Elhaam Basheer Chaudhry.

## Tech Stack

- **Next.js 16** with App Router
- **Tailwind CSS v4** for styling
- **shadcn/ui** components
- **TypeScript** for type safety
- **Markdown** for content
- **PostHog** for analytics and feature flags
- **Vercel** for deployment

## Features

- 🎨 Dark/Light mode with system preference detection
- 📝 Markdown-based content with categories
- 🚀 Server-side rendering for SEO
- 📊 PostHog analytics (pageviews, events, session recordings)
- 🚩 Feature flags for A/B testing and gradual rollouts
- 📱 Fully responsive design
- 🔗 Text selection share popup
- ⏱️ Reading time estimates
- 🏷️ Category organization
- 🤖 llm.txt for AI/SEO optimization

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure PostHog

Copy the example environment file and add your PostHog credentials:

```bash
cp .env.example .env.local
```

Get your API keys from [PostHog](https://app.posthog.com/project/settings):

- `NEXT_PUBLIC_POSTHOG_KEY` - Your project API key (public)
- `NEXT_PUBLIC_POSTHOG_HOST` - Your PostHog host URL
- `POSTHOG_API_KEY` - Server-side API key (optional, for feature flags)
- `POSTHOG_PERSONAL_API_KEY` - Personal API key (optional, for server-side feature flags)

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## PostHog Integration

### Analytics

The blog automatically tracks:

- **Pageviews** - Automatic with `capture_pageview: true`
- **Article reads** - Tracked in `BlogContent` component
- **Text shares** - Tracked when users share selected text
- **Custom events** - Additional events throughout the site

### Feature Flags

Feature flags are used for:

- `new-homepage-design` - A/B test new homepage layouts
- `author-cta` - Show/hide "Work with me" CTA on blog posts

#### Client-side usage

```tsx
"use client";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

export default function MyComponent() {
  const posthog = usePostHog();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    posthog?.isFeatureEnabled("my-flag").then(setIsEnabled);
  }, [posthog]);

  return isEnabled ? <NewFeature /> : <OldFeature />;
}
```

#### Server-side usage

```tsx
import { isFeatureEnabled } from "@/lib/posthog";

export default async function Page() {
  const showNewFeature = await isFeatureEnabled("my-flag", "user-id");
  return showNewFeature ? <NewFeature /> : <OldFeature />;
}
```

## Content Structure

- `content/engineering/` — Technical articles
- `content/personal/` — Personal thoughts and culture
- `content/notes/` — Quick insights and observations

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Don't forget to add your environment variables in Vercel project settings.

## PostHog Pricing

**Free Tier** (Perfect for personal blogs):
- 1 million events/month
- 15,000 recordings/month
- Unlimited team members
- All features included

**Paid** (When you scale):
- $0.00079/event after free tier
- More analytics and features

See [PostHog Pricing](https://posthog.com/pricing) for details.

## License

MIT
