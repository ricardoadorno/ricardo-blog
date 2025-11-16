'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Define all possible app routes for type safety and autocompletion
export type AppRoutes =
    | '/'
    | '/about'
    | '/blog'
    | `/blog/${string}`
    | `/tag/${string}`;

// External link types - for links that go outside our app
export type ExternalLinkType = 'twitter' | 'github' | 'linkedin' | 'email';

// Configuration for external links
const EXTERNAL_LINKS: Record<ExternalLinkType, string> = {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:contact@example.com',
};

type MyLinkProps = {
    href: AppRoutes | ExternalLinkType | string;
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'button' | 'subtle' | 'nav';
    isExternal?: boolean;
    externalIcon?: boolean;
};

export function MyLink({
    href,
    children,
    className,
    variant = 'default',
    isExternal,
    externalIcon = true,
    ...props
}: MyLinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
    // Determine if the link is external
    const isKnownExternalLink = Object.keys(EXTERNAL_LINKS).includes(href as string);
    const isAbsoluteUrl = typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'));
    const isExternalLink = isExternal || isKnownExternalLink || isAbsoluteUrl;

    // Get the correct href
    const linkHref = isKnownExternalLink
        ? EXTERNAL_LINKS[href as ExternalLinkType]
        : href;

    // Style variants with enhanced visuals
    const variantStyles = {
        default: 'relative inline-block text-primary font-medium transition-colors duration-200 hover:text-primary/80',
        button: 'relative inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-primary via-purple-600 to-blue-600 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]',
        subtle: 'relative inline-block text-muted-foreground transition-colors duration-200 hover:text-primary',
        nav: 'relative inline-block text-foreground/80 font-medium transition-colors duration-200 hover:text-primary',
    };

    // Underline animation variants (for default, subtle, nav)
    const needsUnderline = variant !== 'button';

    // If external link, use regular anchor tag
    if (isExternalLink) {
        return (
            <a
                href={linkHref as string}
                className={cn(variantStyles[variant], 'group', className)}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                <span className="relative">
                    {children}
                    {externalIcon && (
                        <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                    )}
                    {needsUnderline && (
                        <motion.span
                            className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-full"
                            initial={{ width: '0%' }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                        />
                    )}
                </span>
            </a>
        );
    }

    // For internal links, use Next.js Link with motion wrapper
    return (
        <Link
            href={linkHref as string}
            className={cn(variantStyles[variant], 'group', className)}
            {...props}
        >
            <span className="relative">
                {children}
                {needsUnderline && (
                    <motion.span
                        className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-full"
                        initial={{ width: '0%' }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    />
                )}
            </span>
        </Link>
    );
}