/* eslint-disable @next/next/no-img-element */
import React from 'react';

export interface OptimizedImageProps {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
}

export function OptimizedImage({
    src,
    alt,
    priority = false,
    className = ""
}: OptimizedImageProps) {
    return (
        <div className={`relative w-full aspect-video overflow-hidden rounded-lg ${className}`}>
            <img
                src={src}
                alt={alt}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                loading={priority ? 'eager' : 'lazy'}
            />
        </div>
    );
}