'use client';

import { useState } from 'react';
import { PostData } from '@/lib/markdown';
import { BlogGrid } from './BlogGrid';

interface SearchProps {
    posts: PostData[];
}

export function Search({ posts }: SearchProps) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter posts based on search term
    const filteredPosts = posts.filter(post => {
        const searchContent = `${post.title} ${post.excerpt} ${post.content} ${post.tags?.join(' ') || ''}`.toLowerCase();
        return searchContent.includes(searchTerm.toLowerCase());
    });

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
                        className="block w-full rounded-md border-gray-300 border py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {searchTerm && (
                    <p className="mt-2 text-sm text-gray-500">
                        Found {filteredPosts.length} results for &quot;{searchTerm}&quot;
                    </p>
                )}
            </div>

            {searchTerm ? (
                filteredPosts.length > 0 ? (
                    <BlogGrid posts={filteredPosts} />
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No posts found matching your search.</p>
                    </div>
                )
            ) : null}
        </div>
    );
}