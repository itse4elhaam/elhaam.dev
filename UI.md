# UI Design Specification: elhaam.dev

> **Status**: Finalized Design
> **Theme**: "The Thoughtful Engineering Blog"
> **Inspiration**: endler.dev, The Pragmatic Engineer
> **Core Principle**: Content-First, Zero-Distraction, Engineering-notebook

This document defines the user interface and design system for `elhaam.dev`. It replaces all previous drafts and serves as the strict implementation guide.

---

## 1. Design Philosophy

The design is **reductionist**. It removes everything that is not the content itself.
-   **No Hero Images**. **No Marketing CTAs**. **No Popups**.
-   **Vibe**: A clean, well-lit workspace. A freshly opened IDE. A well-written technical paper.
-   **Visual Signature**:
    -   **Layout**: Narrow, centered single-column (max-width ~680px).
    -   **Typography**: High-readability Sans-Serif with Monospace accents.
    -   **Interaction**: Fast, client-side filtering (Search), no page reloads for filtering.

---

## 2. Design System

### 2.1. Color Palette (OKLCH)

We utilize **Tailwind CSS v4** with CSS variables.

#### Primary Brand (The "Thoughtful" Accent)
-   **Primary**: `#ff4d00` (Truedevs Orange) - *Subtle usage only* (links, active states).
-   **Background**:
    -   Light: `oklch(99% 0.005 60)` (Near white, paper-like).
    -   Dark: `oklch(14% 0.01 60)` (Soft charcoal, not absolute black).
-   **Foreground (Text)**:
    -   Light: `oklch(25% 0.01 60)` (Dark Grey - High contrast but not harsh).
    -   Dark: `oklch(90% 0.01 60)` (Off-white).
-   **Muted**: `oklch(60% 0.01 60)` (For dates, reading time, secondary info).

### 2.2. Typography

-   **Font Stack**:
    -   **Body/Headings**: `Geist Sans` (or `Inter`). Crisp, modern, legible.
    -   **Code/Meta**: `Geist Mono` (or `JetBrains Mono`). For dates, tags, and code blocks.
-   **Hierarchy**:
    -   **H1 (Post Title)**: Bold, Tight tracking (`-0.02em`). Size: `text-3xl md:text-4xl`.
    -   **Body**: Regular, Relaxed leading (`leading-relaxed` / 1.75). Size: `text-lg` (18px).
    -   **Meta**: Mono, Small (`text-sm`), Muted.

### 2.3. Layout & Spacing

-   **Global Container**: `max-w-2xl` (approx 672px).
    -   *Reasoning*: Matches `endler.dev`'s focus. Keeps line lengths optimal for reading without needing columns.
-   **Vertical Rhythm**:
    -   Sections separated by `py-12` or `py-16`.
    -   List items separated by `py-10`.

---

## 3. Page Specifications

### 3.1. Header (Global)
-   **Layout**: Flex row, `justify-between`, `items-center`. `py-8`.
-   **Left**: Logo text `elhaam.dev`. Font-weight: `semibold`.
-   **Right**:
    -   Theme Toggle (Sun/Moon icon).
    -   (Optional) "RSS" icon.
-   **Style**: Minimal. No background color, no sticky blur (unless content is very long, but start static).

### 3.2. Homepage (The "Index")
The homepage **IS** the blog index.

#### Section A: The Intro (The "Handshake")
-   **Placement**: Top of page, below header.
-   **Content**: 3-4 lines of human text.
    -   *Draft*: "Hi. I'm Elhaam. I build scalable systems at **TrueDevs**. This is where I write about engineering, architecture, and the software craft."
-   **Style**: `text-lg`, `text-muted-foreground`. Links to `TrueDevs` are underlined but not buttons.

#### Section B: The Search (The "Filter")
-   **Placement**: Below Intro, Above List.
-   **Component**: Simple input field.
-   **Placeholder**: "Search posts..."
-   **Style**:
    -   No border (or very subtle bottom border).
    -   Focus: Subtle text color shift.
    -   Icon: Small search icon (Lucide) on the left.
-   **Behavior**: Real-time client-side filtering of the list below.

#### Section C: The Blog List (The "Content")
-   **Layout**: Vertical stack (Single column).
-   **Item Structure**:
    1.  **Date**: `text-xs font-mono text-muted-foreground` (e.g., "2024-01-15").
    2.  **Title**: `text-xl font-bold text-foreground hover:text-primary transition-colors`. Link to post.
    3.  **Excerpt**: `text-base text-muted-foreground mt-2 leading-7`.
    4.  **"Read more"**: Hidden or very subtle (arrow). The Title is the main click target.
-   **Spacing**: Generous margin between items (`mb-12`).

### 3.3. Blog Post Page (`/blog/[slug]`)
-   **Header**:
    -   **Meta**: `font-mono text-sm text-muted-foreground mb-4`. (Date • Category • Read Time).
    -   **Title**: `text-4xl font-extrabold tracking-tight mb-8`.
-   **Content**:
    -   Standard `prose prose-lg prose-slate dark:prose-invert`.
    -   **Code Blocks**: Rounded corners, distinct background, syntax highlighting.
    -   **Images**: Rounded-md, caption centered below.
-   **Footer (Post Level)**:
    -   "Share this" tooltip on text selection.
    -   Link to "All posts" at the bottom.

### 3.4. Footer (Global)
Inspired by `endler.dev`'s personal touch.

-   **Layout**: `mt-24 pt-12 border-t border-border`.
-   **Content**:
    -   **Left**: Small circular avatar (Elhaam).
    -   **Center/Right**:
        -   **Bio**: "Written by **Elhaam**. I do thoughtful engineering at [TrueDevs](https://truedevs.tech)."
        -   **Links**: GitHub, X/Twitter, RSS.
        -   **Greeting**: (Optional) Rotating "Hello/Salaam/Hola" message.

---

## 4. Interaction Design

### 4.1. Search Experience
-   **State**: Local state filters the `posts` array.
-   **Empty State**: "No posts found for 'query'."
-   **Performance**: Must feel instant (keep list in memory).

### 4.2. Navigation
-   Clicking a post title -> Standard Next.js Link transition.
-   Back button -> Preserves scroll position (ideal).

---

## 5. Technical Implementation Guidelines

### 5.1. File Structure
-   `src/app/page.tsx`: The main Index page (Intro + Search + List).
-   `src/components/post-list.tsx`: Client component for the filterable list.
-   `src/components/header.tsx`: Minimal nav.
-   `src/components/footer.tsx`: Personal footer.

### 5.2. Shadcn/UI Usage
-   Use `Input` for search.
-   Use `Button` (variant ghost) for theme toggle.
-   **Avoid** `Card` component for blog posts—use semantic `article` HTML tags with standard Tailwind classes for a cleaner, less "boxed" look.

---

## 6. Implementation Checklist

-   [ ] **Layout**: Implement `max-w-2xl` centered container in `layout.tsx`.
-   [ ] **Typography**: Configure `Geist Sans` and `Geist Mono` in `app/layout.tsx`.
-   [ ] **Home Page**: Build the Intro + Search + List view.
-   [ ] **Search**: Implement `useMemo` filtering for blog posts.
-   [ ] **Footer**: Add the "Thoughtful" bio and TrueDevs link.
-   [ ] **Dark Mode**: Verify OKLCH colors in dark mode.
