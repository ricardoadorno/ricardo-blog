'use client';

import { useState, useEffect } from 'react';
import { PostMeta } from '@/lib/types';
import { BlogGrid } from './BlogGrid';
import { useDebounce } from '@/hooks/use-debaunce';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps {
    posts: PostMeta[];
}

export function Search({ posts }: SearchProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<PostMeta[]>([]);
    const [isFocused, setIsFocused] = useState(false);
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
            <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <label htmlFor="search" className="sr-only">
                    Search blog
                </label>
                <motion.div
                    className="relative rounded-xl overflow-hidden group"
                    animate={{
                        scale: isFocused ? 1.01 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Gradient border effect */}
                    <motion.div
                        className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-primary via-purple-500 to-blue-500 opacity-0"
                        animate={{
                            opacity: isFocused ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Inner container */}
                    <div className="relative rounded-xl bg-card/50 backdrop-blur-xl border border-border/50 shadow-lg group-hover:border-primary/30 transition-all duration-300">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <motion.div
                                animate={{
                                    scale: isFocused ? 1.1 : 1,
                                    color: isFocused ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <SearchIcon className="h-5 w-5" />
                            </motion.div>
                        </div>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="block w-full rounded-xl bg-transparent py-3.5 pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <AnimatePresence>
                            {searchTerm && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
                <AnimatePresence>
                    {searchTerm && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 text-sm text-muted-foreground"
                        >
                            Found <span className="font-semibold text-foreground">{searchResults.length}</span> results for &quot;<span className="text-primary">{searchTerm}</span>&quot;
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
                {searchTerm ? (
                    searchResults.length > 0 ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <BlogGrid posts={searchResults} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="text-center py-12 glass-card"
                        >
                            <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground text-lg">No posts found matching your search.</p>
                            <p className="text-sm text-muted-foreground mt-2">Try different keywords or browse all posts</p>
                        </motion.div>
                    )
                ) : null}
            </AnimatePresence>
        </div>
    );
}