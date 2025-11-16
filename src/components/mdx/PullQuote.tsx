import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PullQuoteProps {
  children: ReactNode;
  author?: string;
  className?: string;
}

export function PullQuote({ children, author, className }: PullQuoteProps) {
  return (
    <aside className={cn("my-12 py-8 px-6 border-y border-border", className)}>
      <blockquote className="text-2xl font-semibold leading-tight text-center italic text-foreground mb-4 max-w-3xl mx-auto">
        &ldquo;{children}&rdquo;
      </blockquote>
      {author && (
        <p className="text-sm text-center text-muted-foreground font-medium">
          &mdash; {author}
        </p>
      )}
    </aside>
  );
}
