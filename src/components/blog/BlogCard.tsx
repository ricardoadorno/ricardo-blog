"use client";

import { MyLink } from '@/components/ui/MyLink';
import { PostMeta } from '@/lib/types';
import { OptimizedImage } from './OptimizedImage';
import { Calendar, User, ArrowRight, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BlogCardProps {
    post: PostMeta;
    featured?: boolean;
}

// Calculate reading time based on content length
function calculateReadingTime(excerpt: string): number {
    // Estimate ~200 words per minute, using excerpt length as proxy
    const wordsPerMinute = 200;
    const wordCount = excerpt.split(' ').length * 3; // Multiply by 3 as excerpt is just a sample
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Color palette for tags based on hash
function getTagColor(tag: string): string {
    const colors = [
        'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
        'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
        'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
        'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    ];

    // Simple hash function to get consistent color for same tag
    const hash = tag.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const readingTime = calculateReadingTime(post.excerpt);

    return (
        <motion.article
            className={cn(
                "group relative overflow-hidden rounded-xl border",
                // Stronger background with better contrast
                "bg-card border-border/40",
                "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5",
                "transition-all duration-300",
                featured && "md:col-span-2 lg:col-span-3"
            )}
            whileHover={{
                y: -6,
                transition: { duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Subtle gradient overlay on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            <div className={cn("relative", featured ? "md:flex md:gap-8" : "flex flex-col")}>
                {/* Cover Image */}
                {post.coverImage && (
                    <div
                        className={cn(
                            "relative overflow-hidden bg-muted/50",
                            featured
                                ? "md:w-1/2 aspect-[16/9] md:aspect-[4/3]"
                                : "aspect-[16/9]"
                        )}
                    >
                        <motion.div
                            animate={{
                                scale: isHovered ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                            className="w-full h-full"
                        >
                            <OptimizedImage
                                src={post.coverImage}
                                alt={`Cover image for ${post.title}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Image overlay gradient for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        {/* Featured badge */}
                        {featured && (
                            <motion.div
                                className="absolute top-4 right-4"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                            >
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground shadow-lg text-xs font-semibold">
                                    <Star className="w-3.5 h-3.5 fill-current" />
                                    <span>Featured</span>
                                </div>
                            </motion.div>
                        )}

                        {/* Category badge */}
                        {post.category && (
                            <motion.div
                                className="absolute top-4 left-4"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-background/95 backdrop-blur-sm border border-border/50 text-foreground shadow-lg">
                                    {post.category}
                                </span>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className={cn(
                    "p-6 space-y-4 flex flex-col",
                    featured ? "md:w-1/2 md:justify-center md:p-8 md:space-y-6" : ""
                )}>
                    {/* Meta info - moved to top for better hierarchy */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <time dateTime={post.date} className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                        <span className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            {readingTime} min read
                        </span>
                        {post.author && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                                <span className="flex items-center gap-1.5 font-medium">
                                    <User className="w-3.5 h-3.5" />
                                    {post.author}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Title - Improved typography hierarchy */}
                    <h2 className={cn(
                        "font-bold leading-tight tracking-tight text-balance",
                        featured
                            ? "text-3xl md:text-4xl lg:text-5xl"
                            : "text-xl md:text-2xl"
                    )}>
                        <MyLink
                            href={`/blog/${post.slug}`}
                            className="text-foreground hover:text-primary transition-colors duration-200 bg-gradient-to-r from-foreground to-foreground bg-[length:0%_2px] bg-no-repeat bg-bottom hover:bg-[length:100%_2px] hover:from-primary hover:to-primary"
                        >
                            {post.title}
                        </MyLink>
                    </h2>

                    {/* Excerpt - Better spacing and sizing */}
                    <p className={cn(
                        "text-muted-foreground leading-relaxed text-pretty",
                        featured
                            ? "line-clamp-4 text-lg md:text-xl"
                            : "line-clamp-3 text-base"
                    )}>
                        {post.excerpt}
                    </p>

                    {/* Tags - Improved visual design with colors */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {post.tags.slice(0, featured ? 4 : 3).map((tag) => (
                                <MyLink
                                    key={tag}
                                    href={`/tag/${tag}`}
                                    className={cn(
                                        "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-200",
                                        "hover:scale-105 hover:shadow-md",
                                        getTagColor(tag)
                                    )}
                                >
                                    #{tag}
                                </MyLink>
                            ))}
                            {post.tags.length > (featured ? 4 : 3) && (
                                <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-muted-foreground">
                                    +{post.tags.length - (featured ? 4 : 3)}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Read More Link - More prominent */}
                    <div className="pt-2 mt-auto">
                        <MyLink
                            href={`/blog/${post.slug}`}
                            className={cn(
                                "inline-flex items-center gap-2 font-semibold text-primary group/link",
                                featured ? "text-base" : "text-sm"
                            )}
                        >
                            <span className="relative">
                                Read full article
                                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-300" />
                            </span>
                            <motion.div
                                animate={{ x: isHovered ? 4 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowRight className={cn("transition-transform", featured ? "w-5 h-5" : "w-4 h-4")} />
                            </motion.div>
                        </MyLink>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
