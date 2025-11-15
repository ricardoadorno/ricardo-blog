"use client";

import { PostMeta } from "@/lib/mdx";
import { BlogCard } from "./BlogCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BlogGridProps {
    posts: PostMeta[];
    featured?: boolean;
    className?: string;
}

export function BlogGrid({ posts, featured = false, className }: BlogGridProps) {
    if (!posts || posts.length === 0) {
        return (
            <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-muted-foreground">No posts found.</p>
            </motion.div>
        );
    }

    // Separate featured post from regular posts
    const featuredPost = featured ? posts[0] : null;
    const regularPosts = featured ? posts.slice(1) : posts;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1] as const,
            },
        },
    };

    return (
        <div className={cn("space-y-8", className)}>
            {/* Featured Post */}
            {featuredPost && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
                >
                    <BlogCard post={featuredPost} featured={true} />
                </motion.div>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {regularPosts.map((post) => (
                        <motion.div
                            key={post.slug}
                            variants={itemVariants}
                        >
                            <BlogCard post={post} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
