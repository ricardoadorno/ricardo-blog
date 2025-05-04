import React from 'react';
import Head from 'next/head';

export interface CanonicalUrlProps {
    path?: string;
}

export function CanonicalUrl({ path }: CanonicalUrlProps) {
    const baseUrl = 'https://ricardo-blog.com';
    const canonicalUrl = path ? `${baseUrl}${path}` : baseUrl;

    return (
        <Head>
            <link rel="canonical" href={canonicalUrl} />
        </Head>
    );
}