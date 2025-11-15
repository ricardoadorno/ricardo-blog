"use client";

import { MyLink } from '@/components/ui/MyLink';
import { PostMeta } from '@/lib/mdx';
import { OptimizedImage } from './OptimizedImage';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BlogCardProps {
    post: PostMeta;
    featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.article
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border/50",
                "bg-card/30 backdrop-blur-sm transition-all duration-300",
                "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10",
                featured && "md:col-span-2 lg:col-span-3"
            )}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            <div className={cn("relative", featured ? "md:flex md:gap-6" : "")}>
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
                        <motion.div
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
                            className="w-full h-full"
                        >
                            <OptimizedImage
                                src={post.coverImage}
                                alt={`Cover image for ${post.title}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Category badge */}
                        {post.category && (
                            <motion.div
                                className="absolute top-4 left-4"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <motion.span
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {post.category}
                                </motion.span>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className={cn("p-6 space-y-4", featured && "md:w-1/2 md:flex md:flex-col md:justify-center")}>
                    {/* Title */}
                    <h2 className={cn(
                        "font-bold leading-tight",
                        featured ? "text-2xl md:text-3xl" : "text-xl"
                    )}>
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
                    <p className={cn(
                        "text-muted-foreground leading-relaxed",
                        featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"
                    )}>
                        {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                                <MyLink
                                    key={tag}
                                    href={`/tag/${tag}`}
                                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
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
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary group/link"
                        >
                            <span>Read article</span>
                            <motion.div
                                animate={{ x: isHovered ? 4 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </MyLink>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
