# AGENTS.md - Codebase Guide for AI Coding Agents

## Build, Lint, and Test Commands

```bash
# Development
npm run dev              # Start Next.js dev server with Turbopack

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint via Next.js linting

# Testing
# ⚠️ NO TEST SUITE CONFIGURED - No test files or testing framework present
# If tests are added later, document single test command here
```

## Tech Stack

- **Next.js 16** (App Router) - React framework with SSR
- **React 19** - UI library
- **TypeScript 5.6** - Type safety (strict mode enabled)
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Component library (Radix UI + CVA)
- **PostHog** - Analytics and feature flags
- **Markdown** - Content (gray-matter, remark, rehype)

## Code Style Guidelines

### Import Conventions

```typescript
// Order: React/Next → Third-party → Internal (@/*) → Relative → CSS
import type { Metadata } from "next";              // Type imports first
import { ThemeProvider } from "@/components/theme-provider";
import "./app.css";

// Use type imports for types only
import type { ClassValue } from "clsx";
import { clsx } from "clsx";

// Destructure named exports
import { cn } from "@/lib/utils";
```

### Type Definitions

```typescript
// Use interface for objects (no prefix - keep it clean)
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
}

// Use inline types for props (no separate interface unless reused)
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// Use type for unions, utilities, or complex transformations
type ButtonVariant = "default" | "destructive" | "outline";
```

### Component Patterns

```typescript
// Functional components with React.forwardRef when needed
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

// Client components: "use client" directive at top
"use client";
import * as React from "react";

// Server components: No directive (default in App Router)
// Async server components for data fetching
export default async function Page() {
  const posts = await getAllPosts();
  return <div>{/* ... */}</div>;
}
```

### Naming Conventions

- **Components**: PascalCase (`Button`, `ThemeProvider`, `BlogContent`)
- **Files**: kebab-case for components (`mode-toggle.tsx`, `blog-content.tsx`)
- **Utilities**: camelCase (`calculateReadingTime`, `cn`)
- **Constants**: camelCase for configs, UPPER_CASE for true constants
- **Directories**: kebab-case (`components/ui`, `app/blog`)

### Styling with Tailwind

```typescript
// Use cn() utility to merge Tailwind classes
import { cn } from "@/lib/utils";

<div className={cn("base-classes", conditional && "extra-classes", className)} />

// CVA for component variants (shadcn pattern)
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});
```

### Error Handling

```typescript
// Guard clauses for file system operations
if (!fs.existsSync(postsDirectory)) {
  return [];
}

// Filter and validate before processing
const categories = fs.readdirSync(postsDirectory).filter((category) => {
  return fs.statSync(path.join(postsDirectory, category)).isDirectory();
});

// Provide sensible defaults
description: data.description || "",
tags: data.tags || [],
```

### PostHog Integration

```typescript
// Client-side: Use PostHog hooks
"use client";
import { usePostHog } from "posthog-js/react";

export default function Component() {
  const posthog = usePostHog();
  
  useEffect(() => {
    posthog?.capture("event_name", { property: "value" });
  }, [posthog]);
}

// Server-side: Import from lib
import { isFeatureEnabled } from "@/lib/posthog";

const showFeature = await isFeatureEnabled("feature-flag-key", "user-id");
```

## File Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   ├── app.css            # Global styles
│   └── blog/
│       └── [slug]/
│           ├── page.tsx           # Dynamic route (server component)
│           └── blog-content.tsx   # Client component for interactivity
├── components/
│   ├── ui/                # shadcn/ui components (button, badge, card, etc.)
│   ├── theme-provider.tsx # next-themes wrapper
│   ├── posthog-provider.tsx # PostHog client provider
│   └── mode-toggle.tsx    # Dark mode toggle
└── lib/
    ├── blog.ts            # Blog post utilities
    ├── markdown.ts        # Markdown processing
    ├── posthog.ts         # PostHog server utilities
    └── utils.ts           # Shared utilities (cn)

content/
├── engineering/           # Technical blog posts
├── personal/             # Personal posts
└── notes/                # Quick insights
```

## TypeScript Configuration

- **Strict mode enabled** - No implicit any, null checks enforced
- **Path alias**: `@/*` maps to `./src/*`
- **Target**: ES2017
- **JSX**: react-jsx (automatic runtime)
- **Module resolution**: bundler (Next.js optimized)

## Key Patterns

### Metadata (SEO)

```typescript
// Use Next.js Metadata API for SEO
export const metadata: Metadata = {
  title: { default: "Site Title", template: "%s | Site" },
  description: "...",
  openGraph: { /* ... */ },
  twitter: { /* ... */ },
};
```

### Data Fetching

```typescript
// Server components: Direct file system access
import fs from "fs";
import path from "path";

export function getAllPosts(): BlogPost[] {
  // Read from file system synchronously - runs on server only
  const files = fs.readdirSync(directory);
  // Process and return data
}
```

### Client Interactivity

```typescript
// Separate client logic into dedicated components
// Parent: Server component (page.tsx)
// Child: Client component (blog-content.tsx) for PostHog tracking, share popups, etc.
```

## Dependencies to Know

- **gray-matter**: Parse frontmatter from markdown files
- **remark/rehype**: Transform markdown to HTML with syntax highlighting
- **date-fns**: Date formatting and manipulation
- **lucide-react**: Icon library
- **next-themes**: Dark mode with system preference detection
- **class-variance-authority**: Type-safe component variants

## Environment Variables

```bash
# PostHog (required for analytics)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
POSTHOG_API_KEY=phx_xxx              # Server-side (optional)
POSTHOG_PERSONAL_API_KEY=phx_xxx     # Feature flags (optional)
```

## Notes for AI Agents

1. **No test suite exists** - If implementing tests, use Vitest or Jest with React Testing Library
2. **Strict TypeScript** - Never use `any`, prefer `unknown` if type is truly unknown
3. **Server-first** - Default to server components, only use "use client" when necessary (hooks, events, browser APIs)
4. **Tailwind v4** - Uses `@import "tailwindcss"` syntax (no tailwind.config.ts visible)
5. **Content-driven** - Blog posts are markdown files in `content/` directory with frontmatter
6. **PostHog everywhere** - Track user interactions, use feature flags for gradual rollouts
7. **shadcn/ui pattern** - Components use CVA for variants, forwardRef for refs, cn() for className merging
8. **Next.js 16 features** - Turbopack dev server, standalone output for Docker deployment
