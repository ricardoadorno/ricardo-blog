import React from 'react';

export interface ArticleSchemaProps {
    post: {
        title: string;
        excerpt: string;
        coverImage?: string;
        date: string;
        lastModified?: string;
        slug: string;
    };
}

export function ArticleSchema({ post }: ArticleSchemaProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage ? `https://ricardo-blog.com${post.coverImage}` : null,
        datePublished: post.date,
        dateModified: post.lastModified || post.date,
        author: {
            '@type': 'Person',
            name: 'Ricardo',
            url: 'https://ricardo-blog.com/about'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Ricardo\'s Blog',
            logo: {
                '@type': 'ImageObject',
                url: 'https://ricardo-blog.com/logo.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://ricardo-blog.com/blog/${post.slug}`
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}