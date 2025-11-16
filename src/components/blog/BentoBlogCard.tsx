"use client";

import { MyLink } from '@/components/ui/MyLink';
import { PostMeta } from '@/lib/types';
import { OptimizedImage } from './OptimizedImage';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BentoBlogCardProps {
    post: PostMeta;
    size?: 'small' | 'medium' | 'large';
}

export function BentoBlogCard({ post, size = 'medium' }: BentoBlogCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const sizeClasses = {
        small: 'md:col-span-1 row-span-1',
        medium: 'md:col-span-1 lg:col-span-2 md:row-span-2',
        large: 'md:col-span-2 lg:col-span-2 md:row-span-2',
    };

    const imageHeightClass = {
        small: 'h-32',
        medium: 'h-48',
        large: 'h-64',
    };

    return (
        <motion.article
            className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/50",
                "bg-card/50 backdrop-blur-sm transition-all duration-300",
                "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
                sizeClasses[size]
            )}
            whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }
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

            <div className="relative h-full flex flex-col">
                {/* Cover Image */}
                {post.coverImage && (
                    <div className={cn("relative overflow-hidden bg-muted/30", imageHeightClass[size])}>
                        <motion.div
                            animate={{
                                scale: isHovered ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
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
                                className="absolute top-3 left-3"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground shadow-lg">
                                    {post.category}
                                </span>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-3 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className={cn(
                        "font-bold leading-tight",
                        size === 'large' ? "text-2xl md:text-3xl" : size === 'medium' ? "text-xl" : "text-lg"
                    )}>
                        <MyLink
                            href={`/blog/${post.slug}`}
                            className="text-foreground hover:text-primary transition-colors duration-200"
                        >
                            {post.title}
                        </MyLink>
                    </h3>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <time dateTime={post.date} className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            })}
                        </time>
                        {post.author && size !== 'small' && (
                            <span className="flex items-center gap-1.5">
                                <User className="w-3 h-3" />
                                {post.author}
                            </span>
                        )}
                    </div>

                    {/* Excerpt */}
                    {size !== 'small' && (
                        <p className={cn(
                            "text-muted-foreground leading-relaxed flex-1",
                            size === 'large' ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"
                        )}>
                            {post.excerpt}
                        </p>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && size !== 'small' && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, size === 'large' ? 4 : 2).map((tag) => (
                                <MyLink
                                    key={tag}
                                    href={`/tag/${tag}`}
                                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                >
                                    <Tag className="w-2.5 h-2.5" />
                                    {tag}
                                </MyLink>
                            ))}
                        </div>
                    )}

                    {/* Read More Link */}
                    <div className="pt-2">
                        <MyLink
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary group/link"
                        >
                            <span>Read more</span>
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
