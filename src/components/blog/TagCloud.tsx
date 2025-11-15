"use client";

import { MyLink } from '@/components/ui/MyLink';
import { Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Tag {
  tag: string;
  count: number;
}

interface TagCloudProps {
  tags: Tag[];
  selectedTag?: string;
  className?: string;
}

export function TagCloud({ tags, selectedTag, className }: TagCloudProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  // Calculate min and max counts
  const counts = tags.map(t => t.count);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);

  // Calculate relative size (1-5 scale)
  const getSize = (count: number): number => {
    if (maxCount === minCount) return 3;
    return Math.ceil(((count - minCount) / (maxCount - minCount)) * 4) + 1;
  };

  // Size classes mapping
  const sizeClasses = {
    1: 'text-xs px-2.5 py-1',
    2: 'text-sm px-3 py-1.5',
    3: 'text-base px-3.5 py-1.5',
    4: 'text-lg px-4 py-2',
    5: 'text-xl px-4 py-2',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <div className={cn(className)}>
      <motion.h2
        className="text-xl font-semibold mb-4 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hash className="w-5 h-5 text-primary" />
        Topics
      </motion.h2>

      <motion.div
        className="flex flex-wrap gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* All tags option */}
        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <MyLink
              href="/blog"
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium",
                "border border-border/50 transition-all duration-300",
                "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
                !selectedTag
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card/30 backdrop-blur-sm hover:bg-primary/10"
              )}
            >
              All
            </MyLink>
          </motion.div>
        </motion.div>

        {tags.map((tagData, index) => {
          const size = getSize(tagData.count) as keyof typeof sizeClasses;
          const isSelected = selectedTag === tagData.tag;

          return (
            <motion.div key={tagData.tag} variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MyLink
                  href={`/tag/${tagData.tag}`}
                  className={cn(
                    "group relative inline-flex items-center gap-2",
                    "rounded-full border border-border/50 backdrop-blur-sm",
                    "font-medium transition-all duration-300",
                    "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
                    sizeClasses[size],
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 border-primary"
                      : "bg-card/30 hover:bg-primary/10"
                  )}
                >
                  <Hash className={cn(
                    "transition-transform group-hover:rotate-12",
                    size <= 2 ? "w-3 h-3" : size <= 3 ? "w-4 h-4" : "w-5 h-5"
                  )} />
                  <span className={cn(
                    "transition-colors",
                    isSelected ? "text-primary-foreground" : "text-foreground group-hover:text-primary"
                  )}>
                    {tagData.tag}
                  </span>
                  <span className={cn(
                    "rounded-full px-1.5 min-w-[1.5rem] text-center text-xs",
                    "transition-colors",
                    isSelected
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                  )}>
                    {tagData.count}
                  </span>
                </MyLink>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
