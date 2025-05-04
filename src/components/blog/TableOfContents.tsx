import React from 'react';

export interface Heading {
    id: string;
    text: string;
    level: number;
}

export interface TableOfContentsProps {
    headings: Heading[];
    activeId?: string;
}

export function TableOfContents({ headings, activeId }: TableOfContentsProps) {
    return (
        <nav aria-label="Table of contents" className="my-6 p-4 border rounded-lg bg-muted/20">
            <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
            <ul className="space-y-1">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`pl-${(heading.level - 2) * 4}`}
                    >
                        <a
                            href={`#${heading.id}`}
                            aria-current={activeId === heading.id ? 'location' : undefined}
                            className={`hover:text-primary transition-colors ${activeId === heading.id ? 'text-primary font-bold' : ''}`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}