# Mini Course: Markdown vs MDX in a Next.js (App Router) Tech Blog

This mini course is aimed at helping you decide **how to render markdown content** for a content-driven tech blog (like this repo) using Next.js App Router.

---

## 0) Your current setup (baseline)

### What you have now

- Blog posts stored as **Markdown** in `content/`
- At build/runtime, you convert markdown **to HTML** using a `unified` pipeline (`remark-parse` + `remark-gfm` + `remark-rehype` + rehype plugins + `rehype-stringify`)
- You render output via `dangerouslySetInnerHTML`

### This approach gives you

- **Fast SSG** (great for Lighthouse / perf)
- Full control of HTML output (typography, code blocks)
- A pure “content” model (posts are not executable code)

### Where it can feel limited

- No React components inside markdown
- Custom “components in content” requires extra conventions (shortcodes, custom syntax, or custom remark plugins)

---

## 1) Definitions

### Markdown (.md)

Plain text that compiles to HTML. No embedded React.

### MDX (.mdx)

Markdown **plus JSX**. This means your content can import/define React components and use them inline.

Key mental model:

- Markdown: **data**
- MDX: **code + data**

---

## 2) Your options for markdown rendering in Next.js

### Option A — Markdown → HTML string (your current approach)

**Pipeline**: `remark-parse` → `remark-gfm` → `remark-rehype` → rehype plugins → `rehype-stringify`

**Pros**

- Very fast and stable
- Minimal moving parts
- Safer by default (content isn’t executable React code)
- Easy to cache / generate statically
- Great for consistent typography + code highlighting (Shiki via `rehype-pretty-code`)

**Cons**

- Harder to embed interactive components
- You must maintain a “component boundary” outside markdown

**Best for**

- Most tech blogs where posts are mostly text/code

---

### Option B — Markdown → React (no raw HTML injection)

Instead of generating an HTML string, you compile markdown into a **HAST/React tree** and render React nodes (or use a renderer like `react-markdown`).

**Pros**

- Avoids raw HTML injection (`dangerouslySetInnerHTML`)
- Easier to control elements (`a`, `pre`, `code`, `h2`, etc.)

**Cons**

- Syntax highlighting can be trickier / more custom
- Can be slower if done on client; best done on server
- Still no JSX-in-content unless you jump to MDX

**Best for**

- When you want stricter XSS posture and fine-grained component mapping

---

### Option C — MDX via Next.js plugin (`@next/mdx`)

This makes `.mdx` a first-class file type in your Next build.

**How it works (high level)**

- You configure Next with `@next/mdx`.
- You can import MDX as components or use it as route files.
- Next supports an experimental Rust compiler (`experimental.mdxRs`) for faster compilation.

**Pros**

- Lowest friction if you want a **component-based** content authoring experience
- You can do things like:
  - `<Callout>`
  - `<Tweet>`
  - `<YouTube>`
  - custom charts/components

**Cons**

- Your content becomes executable: you must treat it as **trusted-only**
- It increases build tooling complexity
- You’ll want conventions around what components are allowed

**Best for**

- Blogs with lots of custom callouts, embedded components, complex layouts

---

### Option D — MDX serialization (remote MDX / CMS) via `next-mdx-remote` style

Used when content comes from:

- a CMS
- database
- remote URL

Next’s docs show patterns for server components using an MDXRemote component. This is powerful but has a huge warning label:

**Security warning**
MDX is code. Remote MDX should only come from **trusted sources**.

**Pros**

- Integrates nicely with CMS workflows
- You can keep Next page code clean and treat content as a stream

**Cons**

- More complex toolchain and runtime
- Harder to lock down safely

**Best for**

- When you truly need remote content and MDX features

---

## 3) Key tradeoffs (the real decision matrix)

### A) Safety / security

- **Markdown → HTML**: Safer baseline if you avoid allowing raw HTML or you sanitize
- **MDX**: Treat as trusted-only, because it’s executable component code

If this is a personal tech blog with git-based content you control, MDX safety is acceptable.
If content is user-generated or remotely editable by untrusted parties: avoid MDX.

### B) Performance (Lighthouse)

- **Best**: SSG + static HTML output (Markdown → HTML / MDX compiled at build)
- Avoid heavy client-side markdown rendering for blog content.

### C) DX (authoring)

- Markdown-only is simpler and encourages consistent style.
- MDX enables richer posts but can lead to “content as code” sprawl.

### D) SEO

Both are excellent if you’re producing static HTML.
What matters more:

- correct headings
- correct metadata
- fast page load

### E) Syntax highlighting quality

- Best-in-class: **Shiki** (via `rehype-pretty-code` or similar)
- highlight.js is okay but usually worse in typography and token quality.

---

## 4) What I recommend for _this_ platform

### Recommendation: Stay with Markdown + unified pipeline (Option A)

Rationale:

- Your repo is a filesystem content blog (perfect for static HTML generation)
- Your goal is **ship fast** and get **95+ Lighthouse**
- Most tech posts don’t require React components inside content
- Your typography/code quality is now controllable and consistent

### When to adopt MDX

Adopt MDX when you have a clear recurring need for components like:

- callouts (note/warn/tip)
- diagrams rendered from code
- embedded interactive widgets
- richer layouts per post

If you go MDX, prefer:

- `@next/mdx` (plugin) for local content
- enforce “trusted-only” content rule
- keep a small allowed component set (no arbitrary imports inside posts)

---

## 5) Migration strategies (pragmatic)

### Strategy 1 (recommended): Markdown default, MDX optional

- Keep `.md` as default
- Add `.mdx` support only for posts that need it
- Keep your typography + code system consistent across both

### Strategy 2: Convert everything to MDX

Only do this if you really need components everywhere. Otherwise it adds complexity for minimal gain.

---

## 6) Cheat sheet

| Need                                          | Best Option               |
| --------------------------------------------- | ------------------------- |
| Minimal tech blog, ship fast, best Lighthouse | Markdown → HTML (unified) |
| Want React components in posts                | @next/mdx                 |
| Want remote CMS content + MDX                 | next-mdx-remote style     |
| Want to avoid dangerouslySetInnerHTML         | Markdown → React renderer |

---

## 7) Next.js MDX notes (from official docs)

- Next.js supports MDX via `@next/mdx`.
- You can enable the experimental Rust compiler with `experimental.mdxRs`.
- Remote MDX rendering patterns exist, but only safe for trusted content.

---

## 8) Action items for you

1. If you keep Markdown (recommended):

   - keep unified pipeline
   - consider adding sanitization if you ever allow raw HTML in markdown

2. If you want MDX later:
   - add `@next/mdx` and configure `pageExtensions`
   - add a small MDX component map (Callout, etc.)
   - keep code highlighting via Shiki
