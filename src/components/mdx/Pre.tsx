'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreProps {
  children?: React.ReactNode;
  raw?: string;
  language?: string;
  filename?: string;
  [key: string]: unknown;
}

export function Pre({
  children,
  raw,
  language,
  filename,
  ...props
}: PreProps) {
  const [copied, setCopied] = useState(false);

  // Extract code from children if raw not provided
  const getCode = () => {
    if (raw) return raw;

    // Try to extract text from children
    if (typeof children === 'string') return children;

    // If children is a code element, get its text content
    if (children && typeof children === 'object' && 'props' in children) {
      const codeProps = children.props as { children?: string };
      if (codeProps.children && typeof codeProps.children === 'string') {
        return codeProps.children;
      }
    }

    return '';
  };

  const handleCopy = async () => {
    const code = getCode();
    if (!code) return;

    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
      {/* Header with filename and language */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm font-medium text-foreground">
                {filename}
              </span>
            )}
            {language && !filename && (
              <span className="text-xs font-mono uppercase text-muted-foreground">
                {language}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Code block */}
      <div className="relative">
        <pre
          {...props}
          className={cn(
            "overflow-x-auto p-4 text-sm leading-relaxed",
            "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
          )}
        >
          {children}
        </pre>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={cn(
            "absolute right-3 top-3 rounded-md p-2",
            "bg-background/80 backdrop-blur-sm border border-border/50",
            "opacity-0 transition-all duration-200",
            "group-hover:opacity-100 hover:bg-accent hover:scale-110",
            "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
