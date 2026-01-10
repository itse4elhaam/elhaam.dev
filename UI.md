# UI Design Specification: elhaam.dev

> **Status**: Living Document
> **Theme**: "The Thoughtful Engineering Blog"
> **Core Principle**: Clarity, Intentionality, Premium Minimalism

This document defines the user interface and design system for `elhaam.dev`. It is designed to be verbose and specific, serving as a strict implementation guide for AI agents and developers.

---

## 1. Design Philosophy

The design must reflect **"Thoughtful Engineering"**.
-   **NOT** "Flashy" or "Trendy" (No excessive gradients, no scroll-jacking).
-   **YES** to High Readability, Semantic HTML, Intentional Whitespace, and Micro-interactions that add value (e.g., text selection share).
-   **Vibe**: A senior engineer's notebook—professional, clean, authoritative, yet personal.

---

## 2. Design System

### 2.1. Color Palette (OKLCH)

We utilize **Tailwind CSS v4** with CSS variables defined in `app.css`. The system uses **OKLCH** for perceptually uniform colors.

#### Primary Brand Color (The "Thoughtful" Gold/Ochre)
Derived from [truedevs.tech](https://truedevs.tech/).
-   **Primary**: `oklch(48% 0.08 50)` (Earthy Gold/Ochre)
    -   *Usage*: Primary buttons, active states, key links, brand accents.
-   **Primary Foreground**: `oklch(98% 0.01 60)` (Off-white)

#### Neutrals (Slate/Zinc equivalent)
-   **Background**: 
    -   Light: `oklch(98% 0.01 60)` (Warm off-white, paper-like)
    -   Dark: `oklch(12% 0.02 60)` (Deep charcoal, soft black)
-   **Foreground (Text)**:
    -   Light: `oklch(20% 0.02 60)` (Soft black, high contrast but not harsh)
    -   Dark: `oklch(95% 0.01 60)` (Off-white)
-   **Muted/Secondary**:
    -   Used for metadata (dates, tags) and secondary backgrounds.
    -   Light: `oklch(95% 0.01 60)`
    -   Dark: `oklch(20% 0.02 60)`

### 2.2. Typography

-   **Headings**: `font-family-sans` (System UI / Inter / Geist). 
    -   *Weight*: Bold (700) or ExtraBold (800) for H1.
    -   *Tracking*: Tight (`-0.02em` to `-0.01em`) for a premium feel.
-   **Body**: `font-family-sans`.
    -   *Line-height*: `1.7` (Relaxed for long-form reading).
    -   *Size*: `1.125rem` (18px) for blog content—readability is king.
-   **Code**: `font-family-mono`.
    -   *Usage*: Inline code, code blocks.

### 2.3. Spacing & Layout

-   **Container Width**: `max-w-4xl` (896px) for the main wrapper.
-   **Reading Width**: `max-w-prose` (65ch) for actual blog text—optimal for eye tracking.
-   **Vertical Rhythm**: 
    -   `py-24` or `py-32` for Hero sections.
    -   `gap-8` for grids.
    -   `space-y-6` for content flow.

---

## 3. Component Specifications

### 3.1. Header / Navigation
-   **Position**: Sticky `top-0`, `z-40`.
-   **Effect**: `backdrop-blur-sm`, `bg-background/80`, `border-b border-border`.
-   **Content**:
    -   **Left**: Logo text `elhaam.dev` (Font-semibold, text-lg).
    -   **Right**: 
        -   Links: "Writing", "Categories" (Hidden on mobile, visible md+).
        -   Theme Toggle (Sun/Moon).
-   **Interaction**: Links have a subtle hover color change to `text-primary`.

### 3.2. Homepage Hero
-   **Text**: "The thoughtful engineering blog".
-   **Style**: H1, `text-5xl md:text-6xl`, font-bold, tracking-tight.
-   **Subtext**: Intro to Elhaam and [truedevs.tech](https://truedevs.tech/).
-   **CTA**: 
    -   Primary Button: "Read the blog" (Shadow `shadow-primary/20`).
    -   Secondary Icon: GitHub link (Ghost variant).
-   **Background**: Subtle gradient `bg-gradient-to-b from-background via-muted/30 to-background`.

### 3.3. Featured Posts (Grid)
-   **Layout**: `grid-cols-1 md:grid-cols-2 gap-8`.
-   **Card Component**:
    -   **Base**: `rounded-xl border bg-card text-card-foreground shadow`.
    -   **Hover Effect**: `hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30 transition-all duration-200`.
    -   **Content**:
        -   Badge (Category): `variant="secondary"`.
        -   Title: Large, bold. Group hover text color change.
        -   Description: Muted foreground, relaxed line height.

### 3.4. Blog Post Layout (`/blog/[slug]`)
-   **Header**:
    -   Title: H1, huge (`text-4xl md:text-5xl`).
    -   Metadata Row: Date • Reading Time • Category.
    -   Separator: Horizontal rule (`my-8`).
-   **Content**:
    -   Uses `@tailwindcss/typography` (`prose prose-lg dark:prose-invert`).
    -   **Links**: `text-primary underline decoration-primary/30 hover:decoration-primary`.
    -   **Blockquotes**: Left border `border-primary/50`, italic text.
    -   **Code Blocks**: Syntax highlighting (Rehype Pretty Code or Shiki), rounded corners, window controls mimicry (optional premium touch).
-   **Interaction**:
    -   **Text Selection**: When user selects text, a tooltip appears: "Share on Twitter".
    -   *Implementation*: See `src/components/home-client.tsx`.

### 3.5. Footer
-   **Design**: `bg-muted/30 border-t border-border`.
-   **Content**:
    -   Short bio.
    -   "Work with us" CTA pointing to `truedevs.tech`.
    -   Social Links (GitHub, Twitter, RSS, Email).
    -   Copyright notice.

### 3.6. "Thoughtful" CTA Section
-   **Location**: Bottom of Home and Blog posts.
-   **Design**: Gradient background `from-primary/5 via-accent/5 to-primary/5`.
-   **Copy**: "We do thoughtful engineering."
-   **Action**: Button linking to [truedevs.tech](https://truedevs.tech/).

---

## 4. Interaction Design

-   **Transitions**: All interactive elements (buttons, links, cards) must have `transition-all duration-200`.
-   **Focus States**: `focus-visible:ring-2 focus-visible:ring-ring` (Accessibility is mandatory).
-   **Dark Mode**: Seamless toggle, no flashing (suppressHydrationWarning on html).

## 5. Implementation Checklist

-   [ ] **Tailwind Config**: Ensure colors match `app.css`.
-   [ ] **Fonts**: Use `next/font` (Geist or Inter).
-   [ ] **Components**: Use `shadcn/ui` as the base, customize via `className` and `app.css` variables.
-   [ ] **Mobile**: Hamburger menu for navigation on small screens.
-   [ ] **SEO**: OpenGraph images, JSON-LD schema for blog posts.

---

**Inspiration References**:
-   *Endler.dev*: For the "Simplicity" and "Footer CTA" structure.
-   *Pragmatic Engineer*: For the "Premium" feel and "Text Selection" feature.
-   *Simon Willison*: For the "SEO/Content" structure.
