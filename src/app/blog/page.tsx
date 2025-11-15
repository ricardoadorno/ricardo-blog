"use client";

import { getSortedPostsData, getAllTags } from "@/lib/mdx";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { TagCloud } from "@/components/blog/TagCloud";
import { Search } from "@/components/blog/Search";
import { MyLink } from "@/components/ui/MyLink";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function BlogIndexPage() {
    const posts = getSortedPostsData();
    const tags = getAllTags();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1] as const,
            },
        },
    };

    return (
        <main className="container mx-auto px-4 py-8 relative">
            {/* Background gradient */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"></div>
                <div className="absolute inset-0 mesh-gradient opacity-30"></div>
            </div>

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <MyLink
                        href="/"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to home
                    </MyLink>
                </motion.div>

                <motion.header
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-3 mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                        <h1 className="text-4xl md:text-6xl font-bold">
                            <span className="text-gradient-primary">Blog</span>
                        </h1>
                    </motion.div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore articles about web development, design patterns, and technology
                    </p>
                </motion.header>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-4 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.aside className="lg:col-span-1" variants={itemVariants}>
                        <TagCloud tags={tags} className="mb-8" />
                    </motion.aside>

                    <motion.div className="lg:col-span-3" variants={itemVariants}>
                        <Search posts={posts} />

                        <section className="mt-8">
                            <motion.h2
                                className="text-2xl font-bold mb-6"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <span className="text-gradient-tech">Latest Articles</span>
                            </motion.h2>
                            <BlogGrid posts={posts} featured={true} />
                        </section>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}