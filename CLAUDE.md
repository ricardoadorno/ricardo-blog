# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog application built with TypeScript, using the App Router architecture. The blog is statically exported and deployed to GitHub Pages. It features markdown-based content management, shadcn/ui components, Tailwind CSS styling, and dark mode support.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build (outputs to ./out directory)
npm run build

# Start production server
npm start

# Lint and auto-fix
npm run lint
```

## Architecture

### Static Site Generation
- **Output mode**: Static export (`output: 'export'` in next.config.ts)
- **Build output**: `./out` directory
- **Images**: Unoptimized for static export compatibility
- **Deployment**: GitHub Actions workflow deploys to GitHub Pages on push to main

### Content Management (MDX-powered)
- **Location**: Blog posts live in `src/content/posts/` as MDX files (.mdx)
- **Processing**: Uses next-mdx-remote for MDX compilation with React Server Components
- **Frontmatter schema**: `title`, `date`, `excerpt`, `author`, `coverImage`, `tags[]`, `category` (optional)
- **Core library**: `src/lib/mdx.ts` handles all post reading, parsing, and MDX compilation
- **Syntax highlighting**: rehype-pretty-code with Shiki (supports both light/dark themes)
- **Features**: Automatic heading IDs (rehype-slug), auto-linked headings, custom React components in posts

### Routing Structure
- `/` - Homepage
- `/blog` - Blog listing page with search and tag cloud
- `/blog/[slug]` - Individual blog posts (statically generated from markdown files)
- `/tag/[tag]` - Tag-filtered blog listings
- `/about` - About page

### Component Organization
- `src/components/ui/` - Reusable UI components (Header, Footer, ThemeToggle, etc.)
- `src/components/blog/` - Blog-specific components (BlogCard, BlogGrid, Search, TableOfContents, etc.)
- `src/components/mdx/` - MDX-specific components (Callout, Pre, YouTubeEmbed, ImageWithCaption)
- `src/components/seo/` - SEO components (ArticleSchema, BreadcrumbsSchema, CanonicalUrl)
- `src/hooks/` - Custom React hooks (use-debounce.ts, use-reduced-motion.ts)
- `src/lib/` - Utility functions and core logic (mdx.ts for MDX processing, utils.ts for utilities)

### Styling System
- **Framework**: Tailwind CSS v4 with PostCSS
- **shadcn/ui**: Configured with "new-york" style, using Lucide icons
- **Theme**: CSS variables for colors, supports dark mode via next-themes
- **Typography**: Tailwind typography plugin for prose styling
- **Fonts**: Geist and Geist Mono via next/font/google

### Key Architectural Patterns

1. **Static Generation**: All blog posts are pre-rendered at build time via `generateStaticParams()` in `src/app/blog/[slug]/page.tsx`

2. **MDX Processing Flow**:
   - `getSortedPostsData()` reads all posts metadata for listings (from `src/lib/mdx.ts`)
   - `getPostData(slug)` reads, compiles MDX, and returns React components
   - Uses `next-mdx-remote/rsc` for server-side MDX compilation
   - Rehype plugins: rehype-slug (heading IDs), rehype-pretty-code (syntax highlighting), rehype-autolink-headings
   - Custom React components available in MDX: Callout, Pre (code blocks with copy button), YouTubeEmbed, ImageWithCaption

3. **SEO Implementation**:
   - `generateMetadata()` in page components creates dynamic metadata
   - Structured data via JSON-LD (ArticleSchema, BreadcrumbsSchema)
   - OpenGraph and Twitter card metadata
   - Base URL: `https://ricardo-blog.com`

4. **Related Posts Logic**: In blog post pages, related posts are determined by:
   - Same category (+10 score)
   - Shared tags (+5 score per tag)
   - Returns top 3 most similar posts

5. **Table of Contents**: Extracted from markdown source before compilation (H2 and H3 headings)

## Creating New Blog Posts

1. Create a new `.mdx` file in `src/content/posts/`
2. Add frontmatter at the top:
   ```yaml
   ---
   title: "Your Post Title"
   date: "2025-01-15"
   excerpt: "Brief description"
   author: "Ricardo"
   coverImage: "/images/cover.jpg"  # Optional
   tags: ["tag1", "tag2"]  # Optional
   category: "Category Name"  # Optional
   ---
   ```
3. Write content using MDX (markdown + JSX)
4. Use custom components in your posts:
   ```mdx
   <Callout type="info" title="Important">
   This is an info callout. Types: info, warning, error, success
   </Callout>

   <YouTubeEmbed id="VIDEO_ID" title="Video Title" />

   <ImageWithCaption
     src="/path/to/image.jpg"
     alt="Description"
     caption="Image caption"
   />
   ```
5. The post will automatically appear in listings and be statically generated
6. Code blocks get automatic syntax highlighting with copy button

## Path Aliases

Configured in `tsconfig.json` and `components.json`:
- `@/` → `./src/`
- `@/components` → `./src/components`
- `@/lib` → `./src/lib`
- `@/hooks` → `./src/hooks`
- `@/ui` → `./src/components/ui`

## Adding shadcn/ui Components

Use the shadcn CLI to add new components:
```bash
npx shadcn@latest add [component-name]
```

Components will be added to `src/components/ui/` and can be imported via `@/components/ui/[component-name]`

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Builds the site on push to main
2. Uploads the `./out` directory
3. Deploys to GitHub Pages

No manual deployment needed - just push to main.

## MDX Components Available

### Callout
Alert-style component for important information:
```mdx
<Callout type="info" title="Optional Title">
Content goes here
</Callout>
```
Types: `info` (blue), `warning` (yellow), `error` (red), `success` (green)

### Pre (Code Blocks)
Automatically applied to code blocks with copy button functionality. No need to use explicitly - just use markdown code blocks:
````mdx
```javascript
const hello = "world";
```
````

### YouTubeEmbed
Embed YouTube videos with responsive aspect ratio:
```mdx
<YouTubeEmbed id="dQw4w9WgXcQ" title="Video Title" />
```

### ImageWithCaption
Image with optional caption:
```mdx
<ImageWithCaption
  src="/images/photo.jpg"
  alt="Description"
  caption="Optional caption"
  width={800}
  height={600}
/>
```

## Important Implementation Details

- **Next.js 15 Async Params**: Route params are now async and must be awaited (`const { slug } = await params`)
- **Theme Provider**: Wrap app in ThemeProvider (already done in layout.tsx) for dark mode support
- **Accessibility**: SkipLink component provides skip-to-content functionality
- **Reading Time**: Calculated at 200 words per minute in blog post pages
- **Image Optimization**: OptimizedImage component wraps next/image with blog-appropriate defaults
- **MDX Compilation**: Happens server-side during build (zero client-side JS for MDX runtime)
- **Syntax Highlighting**: Uses Shiki with github-dark and github-light themes (automatic theme switching)
