'use client';

import { useState, useEffect } from 'react';
import { PostData } from '@/lib/markdown';
import { BlogGrid } from './BlogGrid';
import { useDebounce } from '@/hooks/use-debaunce';

interface SearchProps {
    posts: PostData[];
}

export function Search({ posts }: SearchProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<PostData[]>([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Filter posts based on search term with improved search algorithm
    useEffect(() => {
        if (!debouncedSearchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        const searchTerms = debouncedSearchTerm.toLowerCase().split(' ').filter(term => term.length > 0);

        const results = posts.filter(post => {
            const searchableContent = [
                post.title || '',
                post.excerpt || '',
                post.tags?.join(' ') || ''
            ].join(' ').toLowerCase();

            return searchTerms.some(term => searchableContent.includes(term));
        });

        // Sort results by relevance - posts that match in title are more relevant
        results.sort((a, b) => {
            const aTitle = a.title?.toLowerCase() || '';
            const bTitle = b.title?.toLowerCase() || '';

            const aMatchesTitle = searchTerms.some(term => aTitle.includes(term));
            const bMatchesTitle = searchTerms.some(term => bTitle.includes(term));

            if (aMatchesTitle && !bMatchesTitle) return -1;
            if (!aMatchesTitle && bMatchesTitle) return 1;
            return 0;
        });

        setSearchResults(results);
    }, [debouncedSearchTerm, posts]);

    return (
        <div className="mb-10">
            <div className="mb-6">
                <label htmlFor="search" className="sr-only">
                    Search blog
                </label>
                <div className="relative rounded-md shadow-sm">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full rounded-md border-gray-300 border py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {searchTerm && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Found {searchResults.length} results for &quot;{searchTerm}&quot;
                    </p>
                )}
            </div>

            {searchTerm ? (
                searchResults.length > 0 ? (
                    <BlogGrid posts={searchResults} />
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">No posts found matching your search.</p>
                    </div>
                )
            ) : null}
        </div>
    );
}