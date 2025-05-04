import React from 'react';

export interface BreadcrumbItem {
    name: string;
    url: string;
}

export interface BreadcrumbsSchemaProps {
    items: BreadcrumbItem[];
}

export function BreadcrumbsSchema({ items }: BreadcrumbsSchemaProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}