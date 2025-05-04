import { MetadataRoute } from 'next'
import { getSortedPostsData, getAllPostSlugs } from '@/lib/markdown'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ricardo-blog.com'
  
  // Get all blog posts
  const posts = getSortedPostsData()
  
  // Generate post URLs
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  // Get unique tags
  const allTags = new Set<string>()
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      allTags.add(tag)
    })
  })
  
  // Generate tag URLs
  const tagUrls = Array.from(allTags).map((tag) => ({
    url: `${baseUrl}/tag/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))
  
  // Static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]
  
  return [...staticUrls, ...postUrls, ...tagUrls]
}