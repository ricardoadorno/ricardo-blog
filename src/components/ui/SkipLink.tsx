import React from 'react';

export function SkipLink() {
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background text-foreground p-3 z-50 rounded"
        >
            Skip to main content
        </a>
    );
}