# LLM Requirement Document

## Project: elhaam.dev – The Thoughtful Engineering Blog

---

## 1. Purpose & Intent

The goal is to create a **non-salesy, engineering-first blogging page** for **elhaam.dev**.

- The landing experience must **immediately show blog posts**, not a hero CTA or marketing pitch.
- The page should feel like a place where **real engineers write for other engineers**.
- Any reference to **truedevs.tech** must be **subtle, contextual, and meaningful**, never promotional.
- The tone should convey: _“I do thoughtful engineering at truedevs.tech”_ without calling attention to it as marketing.

This is **not** a traditional landing page.
This is a **blog index that happens to have a thoughtful introduction**.

---

## 2. High-Level Page Behavior

### On First Load

- Immediately display a **list of all blog posts**.
- No gated content.
- No sales copy.
- No newsletter push above the fold.

### Introduction Section (Above Blog List)

- Short, calm, human-written introduction.
- Purpose:

  - Establish the blog’s identity: _the thoughtful engineering blog_
  - Subtly reference work done at **truedevs.tech** as real-world context

**Constraints**:

- Maximum 3 to 4 lines of text
- No buzzwords
- No call-to-action buttons
- No value propositions

---

## 3. Content Display Requirements

### Blog Index

- Display **all blogs by default** on initial load
- Sorted by:

  - Most recent first

- Each blog item should include:

  - Title
  - Short excerpt (auto-generated from markdown)
  - Publish date
  - Reading time
  - Category (derived from folder structure)

### Interaction Principles

- Clicking a blog post navigates directly to the article
- No intermediate pages
- No popups

---

## 4. Search Feature

### Functional Requirements

- Global blog search available on the blog page
- Search must:

  - Work across title
  - Excerpt
  - Full markdown content

- Results should update:

  - Instantly (client-side filtering is acceptable)

### UX Requirements

- Search input should feel:

  - Lightweight
  - Non-intrusive

- No "Search" button required
- Typing should progressively filter posts

---

## 5. Tech Stack & Architecture

### Framework

- Next.js (latest stable version only)

### Rendering Strategy

- Server-Side Rendering (SSR) is mandatory
- Blog index must be SSR-rendered
- Individual blog pages must be SSR-rendered

### Content System

- Markdown-based content system

#### Structure Rules

- Folder = Category
- Markdown file = Blog post

Example:

```
content/
  engineering/
    webhook-concurrency.md
  architecture/
    queue-design.md
```

### Parsing & Metadata

- Frontmatter must support:

  - title
  - description
  - publishedAt
  - tags

- Reading time must be computed automatically

---

## 6. SEO Requirements (Mandatory)

This section must be treated as **non-negotiable**.

### Global SEO

- Semantic HTML structure
- Proper heading hierarchy (h1–h6)
- Canonical URLs
- Sitemap generation
- robots.txt

### Blog-Level SEO

- Unique meta title per post
- Meta description derived from frontmatter
- Open Graph tags
- Twitter card support

### Structural SEO

- Internal linking between related posts
- Category-based URLs
- Clean, human-readable slugs

---

## 7. Design & Visual Direction

### Core Theme

- The design must strongly reflect:

  - “the thoughtful engineering blog”

- Calm
- Intentional
- Engineer-first

### Color Palette

- Prefer the primary color from truedevs.tech
- If conflict arises:

  - Prioritize clarity and thoughtfulness over brand alignment

### Typography

- Must be highly readable
- Comfortable line length
- Generous spacing

---

## 8. Design Inspirations (What to Learn)

### endler.dev

- Simplicity
- Immediate access to content
- Subtle footer copy referencing thoughtful engineering

### The Pragmatic Engineer

- Premium feel without being flashy
- Text selection interaction:

  - Show a contextual “Share” tooltip

### simonwillison.net

- SEO structure
- Highlight sections
- Strong internal linking

---

## 9. Explicit Anti-Patterns

The following must be **actively avoided**:

- Sales copy
- CTA-heavy layouts
- Robotic, template-driven blog layouts
- Overuse of cards
- Marketing language

Specifically:

- Do not emulate Web Dev Simplified’s blog layout
- Avoid anything that feels auto-generated

---

## 10. Planning & Engineering Expectations

Plan and design this system as a **senior engineer who actively blogs**.

### Required Thought Process

- SEO-first architecture decisions
- Long-term content scalability
- Ease of writing and publishing
- Performance under SSR

### Research Expectations

- Study and reference similar GitHub repositories
- Must include research on:

  - [https://github.com/mre/endler.dev](https://github.com/mre/endler.dev)

---

## 11. Output Expectations from the LLM

The LLM should produce:

- A complete blogging page design plan
- Architecture decisions with reasoning
- SEO-focused recommendations
- UX decisions justified from an engineer-reader perspective

The output should feel like it was designed by:

- Someone who writes
- Someone who ships
- Someone who thinks deeply about engineering

Not a marketer.
