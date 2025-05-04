# Blueprint 3: Advanced SEO, Performance & Accessibility

## Overview

This blueprint outlines the final phase of development, focusing on advanced SEO optimization, performance enhancements, and accessibility improvements. Building on the foundation laid in Blueprints 1 & 2, this phase will ensure the blog meets the highest standards for search engines, user experience, and inclusivity.

## 1. Advanced SEO Implementation

### Structured Data & Rich Results
- **Article Schema Implementation**
  ```tsx
  // components/seo/ArticleSchema.tsx
  export function ArticleSchema({ post }) {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage ? `https://ricardo-blog.com${post.coverImage}` : null,
      datePublished: post.date,
      dateModified: post.lastModified || post.date,
      author: {
        '@type': 'Person',
        name: 'Ricardo',
        url: 'https://ricardo-blog.com/about'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Ricardo\'s Blog',
        logo: {
          '@type': 'ImageObject',
          url: 'https://ricardo-blog.com/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://ricardo-blog.com/blog/${post.slug}`
      }
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  }
  ```

- **Breadcrumb Navigation Schema**
  ```tsx
  // components/seo/BreadcrumbsSchema.tsx
  export function BreadcrumbsSchema({ items }) {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  }
  ```

### Canonical URL Management
- **Canonical URL Component**
  ```tsx
  // components/seo/CanonicalUrl.tsx
  import Head from 'next/head';

  export function CanonicalUrl({ path }) {
    const baseUrl = 'https://ricardo-blog.com';
    const canonicalUrl = path ? `${baseUrl}${path}` : baseUrl;
    
    return (
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
    );
  }
  ```

### Open Graph & Social Media
- **Enhanced Metadata Implementation**
  ```tsx
  // app/blog/[slug]/page.tsx (partial)
  export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug);
    const baseUrl = 'https://ricardo-blog.com';
    
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.lastModified || post.date,
        authors: ['Ricardo'],
        url: `${baseUrl}/blog/${post.slug}`,
        images: [
          {
            url: post.coverImage ? `${baseUrl}${post.coverImage}` : `${baseUrl}/default-og.jpg`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        siteName: 'Ricardo\'s Blog',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        creator: '@ricardohandle',
        images: [post.coverImage ? `${baseUrl}${post.coverImage}` : `${baseUrl}/default-og.jpg`],
      },
    };
  }
  ```

## 2. Performance Optimization

### Image Optimization Strategy
- **Next/Image Implementation**
  ```tsx
  // components/blog/OptimizedImage.tsx
  import Image from 'next/image';
  
  export function OptimizedImage({ src, alt, priority = false }) {
    return (
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }
  ```

### Code Optimization
- **Code Splitting Strategy**
  ```tsx
  // components/ui/HeavyComponent.tsx
  import dynamic from 'next/dynamic';
  
  // Instead of direct import
  // import Chart from 'chart.js';
  
  // Use dynamic import
  const Chart = dynamic(() => import('chart.js'), {
    loading: () => <div className="animate-pulse h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>,
    ssr: false // If component doesn't support SSR
  });
  ```

- **Optimized Third-Party Scripts**
  ```tsx
  // app/layout.tsx (partial)
  import Script from 'next/script';
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          {children}
          
          {/* Analytics script loaded strategically */}
          <Script
            src="https://analytics.example.com/script.js"
            strategy="lazyOnload"
            onLoad={() => {
              console.log('Analytics script loaded');
            }}
          />
        </body>
      </html>
    );
  }
  ```

### Core Web Vitals Optimization
- **Largest Contentful Paint (LCP)**
  - Priorities:
    1. Optimize critical CSS
    2. Preload hero images 
    3. Implement responsive image sizing

- **First Input Delay (FID) / Interaction to Next Paint (INP)**
  - Priorities:
    1. Optimize React components (useMemo/useCallback)
    2. Debounce heavy event handlers
    3. Move non-UI work to web workers

- **Cumulative Layout Shift (CLS)**
  - Priorities:
    1. Set explicit dimensions for media
    2. Reserve space for dynamic content
    3. Avoid inserting content above existing content

## 3. Accessibility Enhancements

### Keyboard Navigation
- **Focus Management**
  ```tsx
  // components/ui/Button.tsx (partial)
  import { forwardRef } from 'react';
  
  export const Button = forwardRef(({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
        {...props}
      >
        {children}
      </button>
    );
  });
  ```

- **Skip Navigation Link**
  ```tsx
  // components/ui/SkipLink.tsx
  export function SkipLink() {
    return (
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background text-foreground p-3 z-50"
      >
        Skip to main content
      </a>
    );
  }
  ```

### ARIA Implementation
- **Dynamic ARIA Attributes**
  ```tsx
  // components/blog/TableOfContents.tsx (partial)
  export function TableOfContents({ headings, activeId }) {
    return (
      <nav aria-label="Table of contents">
        <ul>
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? 'location' : undefined}
                className={activeId === heading.id ? 'text-primary font-bold' : ''}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  ```

### Color Contrast & User Preferences
- **High Contrast Mode Support**
  ```css
  /* globals.css (partial) */
  @media (forced-colors: active) {
    .button {
      border: 2px solid transparent;
    }
    
    .card {
      border: 1px solid currentColor;
    }
  }
  ```

- **Reduced Motion Support**
  ```tsx
  // hooks/useReducedMotion.ts
  import { useEffect, useState } from 'react';

  export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    
    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', onChange);
      
      return () => mediaQuery.removeEventListener('change', onChange);
    }, []);
    
    return prefersReducedMotion;
  }
  ```

## 4. Implementation Checklist

### SEO Tasks
- [ ] Add article schema to blog posts
- [ ] Implement breadcrumb schema
- [ ] Create canonical URL component
- [ ] Enhance OpenGraph and Twitter meta tags
- [ ] Implement 301 redirects for old URL patterns
- [ ] Create custom 404 page with helpful navigation

### Performance Tasks
- [ ] Optimize all images with Next/Image
- [ ] Implement code splitting for heavy components
- [ ] Create loading states for async components
- [ ] Add Web Vitals monitoring
- [ ] Optimize third-party scripts loading
- [ ] Implement server vs. client component strategy

### Accessibility Tasks
- [ ] Add skip navigation link
- [ ] Ensure proper heading hierarchy
- [ ] Implement proper ARIA attributes
- [ ] Support keyboard navigation throughout site
- [ ] Add support for reduced motion preferences
- [ ] Ensure sufficient color contrast in all themes

## 5. Validation & Testing

### SEO Testing
- [ ] Validate schema with Google's Rich Results Test
- [ ] Check OpenGraph tags with Facebook Debugger
- [ ] Verify Twitter Cards with Twitter Card Validator
- [ ] Test performance with PageSpeed Insights
- [ ] Validate robots.txt functionality
- [ ] Ensure sitemap.xml contains all relevant URLs

### Accessibility Testing
- [ ] Run automated tests with axe DevTools
- [ ] Perform keyboard-only navigation tests
- [ ] Test with screen readers (NVDA/VoiceOver)
- [ ] Verify color contrast compliance
- [ ] Test with different user preferences enabled
- [ ] Create accessibility statement page

This blueprint provides a comprehensive roadmap for elevating the blog to industry best practices for SEO, performance, and accessibility, building on the successful implementation of Blueprints 1 and 2.