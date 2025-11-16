"use client";

import { useState, useMemo } from "react";
import { PostMeta } from "@/lib/types";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { TagCloud } from "@/components/blog/TagCloud";
import { Search } from "@/components/blog/Search";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Pagination } from "@/components/ui/Pagination";
import { MyLink } from "@/components/ui/MyLink";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";

interface BlogContentProps {
  posts: PostMeta[];
  tags: { tag: string; count: number }[];
}

const POSTS_PER_PAGE = 9;

export function BlogContent({ posts, tags }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract categories from posts
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    posts.forEach((post) => {
      if (post.category) {
        categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
      }
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
  }, [posts]);

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  // Paginate filtered posts
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
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
    <main className="container mx-auto px-6 py-12 relative">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute inset-0 mesh-gradient opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto">
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

          <motion.div className="lg:col-span-3 space-y-8" variants={itemVariants}>
            <Search posts={posts} />

            {/* Category Filter */}
            {categories.length > 0 && (
              <CategoryFilter
                categories={categories}
                activeCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            )}

            <section>
              <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold">
                  <span className="text-gradient-tech">
                    {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
                </p>
              </motion.div>

              <BlogGrid posts={paginatedPosts} featured={true} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}

              {/* Empty State */}
              {paginatedPosts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-2">
                    No articles found in this category.
                  </p>
                  <button
                    onClick={() => handleCategoryChange("All")}
                    className="text-primary hover:underline"
                  >
                    View all articles
                  </button>
                </div>
              )}
            </section>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
