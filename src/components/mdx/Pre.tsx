'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface PreProps {
  children?: React.ReactNode;
  raw?: string;
  [key: string]: unknown;
}

export function Pre({ children, raw, ...props }: PreProps) {
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
    <div className="group relative">
      <pre {...props} className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm dark:bg-gray-950">
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md bg-gray-700 p-2 opacity-0 transition-opacity hover:bg-gray-600 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-gray-300" />
        )}
      </button>
    </div>
  );
}
