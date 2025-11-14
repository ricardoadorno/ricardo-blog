import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/mdx";

interface PostNavigationProps {
  prev: PostMeta | null;
  next: PostMeta | null;
  className?: string;
}

export function PostNavigation({ prev, next, className }: PostNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-12 pt-12 border-t border-border/50",
        className
      )}
      aria-label="Post navigation"
    >
      {/* Previous Post */}
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group relative flex flex-col gap-2 p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
        >
          {/* Hover gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-300" />
            <span>Previous</span>
          </div>

          <div className="relative">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {prev.title}
            </h3>
            {prev.excerpt && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {prev.excerpt}
              </p>
            )}
          </div>

          {prev.category && (
            <span className="relative text-xs text-primary/80 font-medium">
              {prev.category}
            </span>
          )}
        </Link>
      ) : (
        <div />
      )}

      {/* Next Post */}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group relative flex flex-col gap-2 p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden md:text-right"
        >
          {/* Hover gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative flex items-center gap-2 text-sm text-muted-foreground md:justify-end">
            <span>Next</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
          </div>

          <div className="relative">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {next.title}
            </h3>
            {next.excerpt && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {next.excerpt}
              </p>
            )}
          </div>

          {next.category && (
            <span className="relative text-xs text-primary/80 font-medium md:ml-auto">
              {next.category}
            </span>
          )}
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
