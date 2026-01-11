# Issues Tracker

This document tracks all issues found during the blog redesign and their resolution status.

## 🔴 High Priority Issues

### [IN PROGRESS] Add fullscreen mode to blog posts
- **Issue**: Need distraction-free reading mode
- **Requirements**:
  - Hide: header, footer, TOC, ReadingProgress, ToggleTheme, ScrollToTop, back button, related posts, post navigation
  - Persist preference in localStorage
  - Add keyboard shortcut "f" to toggle
  - Update keyboard shortcuts dialog to show "f" key
- **Status**: Context created, needs localStorage + integration
- **Files**: `src/contexts/fullscreen-context.tsx`, `src/app/blog/[slug]/page.tsx`

### [PENDING] Add TOC feature flag
- **Issue**: Hide TOC via environment variable (user still thinking about it)
- **Requirements**:
  - Add `NEXT_PUBLIC_ENABLE_TOC` to `.env.example`
  - Conditionally render TOC based on flag
- **Status**: Not started
- **Files**: `src/components/table-of-contents.tsx` or blog page layout

## 🟡 Medium Priority Issues

### [PENDING] Make 'Elhaam' clickable in byline
- **Issue**: "Written by Elhaam" - "Elhaam" should link to homepage
- **Current**: Already implemented (line 138-142 in blog/[slug]/page.tsx)
- **Status**: ✅ Verified - link exists and works correctly
- **File**: `src/app/blog/[slug]/page.tsx`

## 🟢 Low Priority Issues

### [PENDING] Delete session file when complete
- **Issue**: Old session file needs cleanup
- **Action**: Delete `session-ses_4522-design-overhaul.md` after all issues resolved
- **File**: `session-ses_4522-design-overhaul.md`

## ✅ Resolved Issues

### [RESOLVED] Fix j/k scroll speed
- **Issue**: Pressing j/k repeatedly scrolls too slowly
- **Fix**: Changed from 300px instant to 150px smooth scrolling
- **Date**: 2026-01-12
- **File**: `src/components/keyboard-nav.tsx`

### [RESOLVED] Minify keyboard shortcuts indicator
- **Issue**: "Vim • Press ? for help" is too distracting
- **Fix**: Reduced to tiny "?" icon with Vim logo
- **Date**: 2026-01-12
- **File**: `src/components/keyboard-nav.tsx`

### [RESOLVED] Remove dialog animations from keyboard nav
- **Issue**: Close animation and primary border on dialog
- **Fix**: Removed `[&_[role=dialog]]:!duration-0` animations and changed border to `border-border`
- **Date**: 2026-01-12
- **File**: `src/components/keyboard-nav.tsx`

### [RESOLVED] Fix duplicate key error in table-of-contents
- **Issue**: React warning about duplicate keys in TOC
- **Fix**: Added fallback key generation `id: elem.id || \`heading-${index}\``
- **Date**: 2026-01-12
- **File**: `src/components/table-of-contents.tsx`

### [RESOLVED] Make TOC more discoverable
- **Issue**: Users don't know they can hover on left side to see TOC
- **Fix**: Added `animate-pulse-slow` class to the tab indicator
- **Date**: 2026-01-12
- **File**: `src/components/table-of-contents.tsx`

### [RESOLVED] Add text-primary to homepage post titles on hover
- **Issue**: Homepage post titles should turn orange on hover
- **Fix**: Added `hover:text-primary` to post title element
- **Date**: 2026-01-12
- **File**: `src/components/post-list.tsx`

### [RESOLVED] Update footer bio
- **Issue**: Footer needs new bio text
- **Fix**: Updated with new personal bio, removed "Elhaam Basheer Chaudhry" (kept just "Elhaam")
- **Date**: 2026-01-12
- **File**: `src/components/site-footer.tsx`

### [RESOLVED] Remove hover:text-primary from article headings
- **Issue**: Hovering over article content converts headings to orange
- **Fix**: Verified no `hover:text-primary` exists on prose-headings in globals.css
- **Date**: 2026-01-12
- **Status**: Never present - no fix needed
- **File**: `src/app/globals.css`

### [RESOLVED] Changed metadata back to full name
- **Issue**: Metadata should say "Elhaam Basheer Chaudhry" (not just "Elhaam")
- **Fix**: Updated all metadata instances to use full name while header keeps "Elhaam"
- **Date**: 2026-01-12
- **Files**: `src/app/layout.tsx`, `src/app/blog/[slug]/page.tsx`

### [RESOLVED] Coming-soon posts accessible via direct URL
- **Issue**: Could navigate to /blog/thoughtful-defensive-engineering despite "coming-soon" tag
- **Fix**: Added filter to generateStaticParams() and 404 check in page component
- **Date**: 2026-01-11
- **File**: `src/app/blog/[slug]/page.tsx`

### [RESOLVED] Orange hover states everywhere
- **Issue**: Multiple components had `hover:text-primary` creating unwanted orange highlights
- **Fix**: Replaced with neutral colors (`hover:text-foreground`)
- **Date**: 2026-01-11
- **Files**: site-header.tsx, related-posts.tsx, site-footer.tsx, post-navigation.tsx

### [RESOLVED] Newsletter components not needed
- **Issue**: Newsletter signup feature added but not required
- **Fix**: Completely removed newsletter-signup.tsx and API route
- **Date**: 2026-01-11
- **Files**: Deleted newsletter-signup.tsx, api/newsletter/route.ts

### [RESOLVED] Standalone output warning
- **Issue**: `next start` warning about standalone configuration
- **Fix**: Removed `output: "standalone"` from next.config.ts
- **Date**: 2026-01-11
- **File**: `next.config.ts`

### [RESOLVED] Favicon showing black edges
- **Issue**: Profile picture favicon had black borders
- **Fix**: Used ImageMagick to crop and zoom dp.jpeg to fill entire space
- **Date**: 2026-01-11
- **File**: `public/dp.jpeg`

### [RESOLVED] Coming-soon posts sorted by date
- **Issue**: Coming-soon articles mixed with regular posts in date order
- **Fix**: Modified sorting to always push coming-soon posts to bottom
- **Date**: 2026-01-11
- **File**: `src/components/post-list.tsx`

### [RESOLVED] Remove "Written by Elhaam" from homepage post previews
- **Issue**: Byline text not needed on homepage
- **Fix**: Removed byline from post-list.tsx
- **Date**: 2026-01-12
- **File**: `src/components/post-list.tsx`

### [RESOLVED] Fix ToggleTheme visibility
- **Issue**: Theme toggle button not visible
- **Fix**: Repositioned to `top-16 right-4` with border, backdrop, and shadow
- **Date**: 2026-01-12
- **File**: `src/components/toggle-theme.tsx`

### [RESOLVED] Fix ReadingProgress and ModeToggle alignment
- **Issue**: Both components should be right-aligned at top
- **Fix**: Applied consistent positioning
- **Date**: 2026-01-12
- **Files**: `src/components/reading-progress.tsx`, `src/components/toggle-theme.tsx`

### [RESOLVED] Fix TOC heading text appearing trimmed
- **Issue**: Negative margin `-ml-3` causing text to look cut off
- **Fix**: Removed negative margin from TOC heading styles
- **Date**: 2026-01-12
- **File**: `src/components/table-of-contents.tsx`

### [RESOLVED] Make progress bar thinner
- **Issue**: Reading progress bar too thick
- **Fix**: Changed from `h-1` to `h-0.5`
- **Date**: 2026-01-12
- **File**: `src/components/reading-progress.tsx`

### [RESOLVED] Add padding to code blocks
- **Issue**: Code blocks need more breathing room
- **Fix**: Changed from `px-4 py-3` to `px-6 py-5`
- **Date**: 2026-01-12
- **File**: `src/app/globals.css`

### [RESOLVED] Footer redesign
- **Issue**: Footer needs new layout and content
- **Fix**: Added photo (dp.jpeg), new heading "Hi, I'm Elhaam Basheer Chaudhry", shortened bio, added LinkedIn/Upwork icons
- **Date**: 2026-01-12
- **File**: `src/components/site-footer.tsx`

## 📝 Notes

- Package manager: **Bun** (not npm)
- Build command: `bun run build`
- Dev server: `bun run dev`
- All changes must pass build before committing

## 🎯 What is Post Navigation?

**PostNavigation component** displays "Previous" and "Next" article links at the bottom of blog posts:
- Shows chronologically adjacent posts (filtered from coming-soon/test)
- Responsive 2-column grid with hover animations
- Only renders if there's an actual previous/next post available
- Files: `src/components/post-navigation.tsx`, `src/lib/post-navigation.ts`
