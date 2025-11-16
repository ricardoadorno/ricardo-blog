'use client';

import { MyLink } from '@/components/ui/MyLink';
import { PostMeta } from '@/lib/types';
import { OptimizedImage } from './OptimizedImage';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BlogCard3DProps {
  post: PostMeta;
  featured?: boolean;
}

export function BlogCard3D({ post, featured = false }: BlogCard3DProps) {
  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/50",
        "bg-card hover:border-border transition-all duration-300",
        "hover:shadow-md",
        featured && "md:col-span-2 lg:col-span-3"
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className={cn("relative", featured ? "md:flex md:gap-8" : "")}>
        {/* Cover Image */}
        {post.coverImage && (
          <div
            className={cn(
              "relative overflow-hidden bg-muted/30",
              featured
                ? "md:w-1/2 aspect-[16/10] md:aspect-auto"
                : "aspect-video"
            )}
          >
            <div className="w-full h-full overflow-hidden">
              <OptimizedImage
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Category badge */}
            {post.category && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background/90 backdrop-blur-sm border border-border/50 text-foreground">
                  {post.category}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn("p-6 space-y-4", featured && "md:w-1/2 md:flex md:flex-col md:justify-center")}>
          {/* Title */}
          <h2
            className={cn(
              "font-bold leading-tight text-balance",
              featured ? "text-2xl md:text-3xl" : "text-xl"
            )}
          >
            <MyLink
              href={`/blog/${post.slug}`}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              {post.title}
            </MyLink>
          </h2>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.date} className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            )}
          </div>

          {/* Excerpt */}
          <p
            className={cn(
              "text-muted-foreground leading-relaxed text-pretty",
              featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"
            )}
          >
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <MyLink
                  key={tag}
                  href={`/tag/${tag}`}
                  className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
                >
                  #{tag}
                </MyLink>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1 text-xs text-muted-foreground">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Read More Link */}
          <div className="pt-2">
            <MyLink
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary group/link hover:underline"
            >
              <span>Read article</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
            </MyLink>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
