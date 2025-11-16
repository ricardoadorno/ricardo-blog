import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AsideProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Aside({ children, title = 'Nota', className }: AsideProps) {
  return (
    <aside className={cn(
      "my-6 p-4 rounded-lg bg-muted/30 border-l-4 border-muted-foreground/50 text-sm",
      className
    )}>
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
        {title}
      </p>
      <div className="text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none">
        {children}
      </div>
    </aside>
  );
}
