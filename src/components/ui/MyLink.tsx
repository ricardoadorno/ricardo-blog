import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

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
    href: AppRoutes | ExternalLinkType;
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
    const isExternalLink = isExternal || Object.keys(EXTERNAL_LINKS).includes(href as string);

    // Get the correct href
    const linkHref = isExternalLink && Object.keys(EXTERNAL_LINKS).includes(href as string)
        ? EXTERNAL_LINKS[href as ExternalLinkType]
        : href;

    // Style variants
    const variantStyles = {
        default: 'text-blue-600 hover:underline dark:text-blue-400',
        button: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors',
        subtle: 'text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400',
        nav: 'hover:text-blue-600 transition-colors dark:text-gray-200 dark:hover:text-blue-400',
    };

    // If external link, use regular anchor tag
    if (isExternalLink) {
        return (
            <a
                href={linkHref as string}
                className={cn(variantStyles[variant], className)}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
                {externalIcon && (
                    <span className="inline-block ml-1">↗</span>
                )}
            </a>
        );
    }

    // For internal links, use Next.js Link
    return (
        <Link
            href={linkHref as string}
            className={cn(variantStyles[variant], className)}
            {...props}
        >
            {children}
        </Link>
    );
}