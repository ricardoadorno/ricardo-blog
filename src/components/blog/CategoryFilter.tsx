'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';

interface Category {
  name: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  // Add "All" option
  const allCategories = [
    { name: 'All', count: categories.reduce((sum, cat) => sum + cat.count, 0) },
    ...categories,
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span>Filter by category</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {allCategories.map((category, index) => {
          const isActive = activeCategory === category.name;

          return (
            <motion.button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'relative px-4 py-2 rounded-lg border transition-all duration-200 flex items-center justify-between gap-2',
                'hover:border-primary/50 hover:bg-primary/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-background border-border/50'
              )}
              aria-pressed={isActive}
            >
              <span className="font-medium">{category.name}</span>
              <span
                className={cn(
                  'ml-2 text-xs px-1.5 py-0.5 rounded-full',
                  isActive
                    ? 'bg-primary-foreground/20'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {category.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
