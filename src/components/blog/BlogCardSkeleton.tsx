import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface BlogCardSkeletonProps {
  featured?: boolean;
  className?: string;
}

export function BlogCardSkeleton({ featured = false, className }: BlogCardSkeletonProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm",
        featured && "md:col-span-2 lg:col-span-3",
        className
      )}
    >
      <div className={cn("relative", featured ? "md:flex md:gap-6" : "")}>
        {/* Cover Image Skeleton */}
        <Skeleton
          className={cn(
            "relative bg-muted/30",
            featured
              ? "md:w-1/2 aspect-[16/10] md:aspect-auto h-full"
              : "aspect-video w-full"
          )}
        />

        {/* Content Skeleton */}
        <div className={cn("p-6 space-y-4", featured && "md:w-1/2 md:flex md:flex-col md:justify-center")}>
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className={cn("h-6 w-3/4", featured && "h-8")} />
            <Skeleton className={cn("h-6 w-1/2", featured && "h-8")} />
          </div>

          {/* Meta */}
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-14 rounded-md" />
          </div>

          {/* Read More */}
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </article>
  );
}
