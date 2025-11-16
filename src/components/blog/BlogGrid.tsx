"use client";

import { PostMeta } from "@/lib/types";
import { BentoBlogCard } from "./BentoBlogCard";
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

    // Bento grid pattern: alternating sizes for visual interest
    const getBentoSize = (index: number): 'small' | 'medium' | 'large' => {
        if (featured && index === 0) return 'large';

        // Pattern: large, medium, medium, small, small, repeat
        const pattern = index % 5;
        if (pattern === 0) return 'medium';
        if (pattern === 1 || pattern === 2) return 'medium';
        return 'small';
    };

    return (
        <motion.div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(200px,auto)] gap-4",
                className
            )}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {posts.map((post, index) => (
                <motion.div
                    key={post.slug}
                    variants={itemVariants}
                >
                    <BentoBlogCard post={post} size={getBentoSize(index)} />
                </motion.div>
            ))}
        </motion.div>
    );
}
