import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { mdxComponents } from '@/components/mdx';

// Define the posts directory
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  category?: string;
}

export interface PostData extends PostMeta {
  content: React.ReactElement;
}

// Configure rehype-pretty-code options
const rehypePrettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: false,
  defaultLang: 'plaintext',
};

// Configure rehype-autolink-headings options
const rehypeAutolinkHeadingsOptions = {
  behavior: 'wrap',
  properties: {
    className: ['anchor'],
  },
};

/**
 * Get all post slugs from the posts directory
 */
export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''));
}

/**
 * Get sorted posts metadata (without content)
 */
export function getSortedPostsData(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        coverImage: data.coverImage,
        author: data.author,
        tags: data.tags,
        category: data.category,
      } as PostMeta;
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get post data by slug (with compiled MDX content)
 */
export async function getPostData(slug: string): Promise<PostData> {
  // Try both .mdx and .md extensions
  let fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${slug}.md`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Compile MDX with rehype plugins and custom components
  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false, // We already parsed with gray-matter
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions],
          [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
        ],
      },
    },
  });

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    coverImage: data.coverImage,
    author: data.author,
    tags: data.tags,
    category: data.category,
    content: mdxContent,
  };
}

/**
 * Calculate reading time based on word count
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Get related posts based on tags and category
 */
export function getRelatedPosts(
  currentSlug: string,
  currentTags: string[] = [],
  currentCategory?: string,
  limit: number = 3
): PostMeta[] {
  const allPosts = getSortedPostsData();

  // Filter out current post
  const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);

  // Score posts based on similarity
  const scoredPosts = otherPosts.map((post) => {
    let score = 0;

    // Same category = +10 points
    if (currentCategory && post.category === currentCategory) {
      score += 10;
    }

    // Shared tags = +5 points per tag
    if (currentTags.length > 0 && post.tags) {
      const sharedTags = post.tags.filter((tag) => currentTags.includes(tag));
      score += sharedTags.length * 5;
    }

    return { post, score };
  });

  // Sort by score (highest first) and return top N
  return scoredPosts
    .filter(({ score }) => score > 0) // Only posts with some relation
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

/**
 * Extract headings from markdown content for table of contents
 */
export function extractHeadingsFromMd(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({
      level,
      id,
      text,
    });
  }

  return headings;
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getSortedPostsData();
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/**
 * Get all unique categories from all posts
 */
export function getAllCategories(): { category: string; count: number }[] {
  const posts = getSortedPostsData();
  const categoryCounts = new Map<string, number>();

  posts.forEach((post) => {
    if (post.category) {
      categoryCounts.set(
        post.category,
        (categoryCounts.get(post.category) || 0) + 1
      );
    }
  });

  return Array.from(categoryCounts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

/**
 * Get adjacent posts (previous and next) for navigation
 */
export function getAdjacentPosts(currentSlug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const allPosts = getSortedPostsData(); // Already sorted by date (newest first)
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // Previous post is older (higher index in array)
  const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  // Next post is newer (lower index in array)
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return { prev, next };
}
