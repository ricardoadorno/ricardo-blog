import { ReactNode } from 'react';
import { Quote as QuoteIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
  variant?: 'default' | 'accent' | 'minimal';
  className?: string;
}

export function Quote({
  children,
  author,
  source,
  variant = 'default',
  className
}: QuoteProps) {
  if (variant === 'minimal') {
    return (
      <blockquote className={cn("my-6 border-l-4 border-primary pl-6 italic", className)}>
        <div className="prose prose-lg dark:prose-invert [&>p]:my-2">
          {children}
        </div>
        {(author || source) && (
          <footer className="mt-3 text-sm text-muted-foreground not-italic">
            {author && <cite className="font-semibold not-italic">{author}</cite>}
            {author && source && <span className="mx-1">—</span>}
            {source && <span>{source}</span>}
          </footer>
        )}
      </blockquote>
    );
  }

  return (
    <blockquote
      className={cn(
        "relative my-8 overflow-hidden rounded-xl border border-border/50 p-8",
        variant === 'accent'
          ? "bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10 dark:from-primary/5"
          : "bg-card/30 backdrop-blur-sm",
        className
      )}
    >
      {/* Quote icon decoration */}
      <QuoteIcon
        className={cn(
          "absolute -left-2 -top-2 h-16 w-16 opacity-10",
          variant === 'accent' ? "text-primary" : "text-muted-foreground"
        )}
      />

      {/* Content */}
      <div className="relative">
        <div
          className={cn(
            "prose prose-lg dark:prose-invert max-w-none",
            "[&>p]:my-3 [&>p]:text-lg [&>p]:leading-relaxed",
            variant === 'accent' && "[&>p]:text-foreground/90"
          )}
        >
          {children}
        </div>

        {/* Attribution */}
        {(author || source) && (
          <footer className="mt-6 flex items-center gap-3 border-t border-border/30 pt-4">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-purple-500" />
            <div className="flex-1 text-sm">
              {author && (
                <cite className="block font-semibold text-foreground not-italic">
                  {author}
                </cite>
              )}
              {source && (
                <span className="block text-muted-foreground">{source}</span>
              )}
            </div>
          </footer>
        )}
      </div>
    </blockquote>
  );
}
