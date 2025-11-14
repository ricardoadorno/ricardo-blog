import { MyLink } from '@/components/ui/MyLink';
import { Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  return (
    <div className={cn(className)}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Hash className="w-5 h-5 text-primary" />
        Topics
      </h2>

      <div className="flex flex-wrap gap-3">
        {/* All tags option */}
        <MyLink
          href="/blog"
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium",
            "border border-border/50 transition-all duration-300",
            "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5",
            !selectedTag
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-card/30 backdrop-blur-sm hover:bg-primary/10"
          )}
        >
          All
        </MyLink>

        {tags.map((tagData, index) => {
          const size = getSize(tagData.count) as keyof typeof sizeClasses;
          const isSelected = selectedTag === tagData.tag;

          return (
            <MyLink
              key={tagData.tag}
              href={`/tag/${tagData.tag}`}
              className={cn(
                "group relative inline-flex items-center gap-2",
                "rounded-full border border-border/50 backdrop-blur-sm",
                "font-medium transition-all duration-300",
                "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
                "hover:-translate-y-0.5",
                "animate-in fade-in slide-in-from-bottom-2",
                sizeClasses[size],
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 border-primary"
                  : "bg-card/30 hover:bg-primary/10"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
                animationDuration: '400ms',
                animationFillMode: 'both'
              }}
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
          );
        })}
      </div>
    </div>
  );
}
