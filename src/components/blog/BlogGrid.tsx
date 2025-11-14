"use client";

import { PostMeta } from "@/lib/mdx";
import { BlogCard } from "./BlogCard";
import { cn } from "@/lib/utils";

interface BlogGridProps {
    posts: PostMeta[];
    featured?: boolean;
    className?: string;
}

export function BlogGrid({ posts, featured = false, className }: BlogGridProps) {
    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found.</p>
            </div>
        );
    }

    // Separate featured post from regular posts
    const featuredPost = featured ? posts[0] : null;
    const regularPosts = featured ? posts.slice(1) : posts;

    return (
        <div className={cn("space-y-8", className)}>
            {/* Featured Post */}
            {featuredPost && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <BlogCard post={featuredPost} featured={true} />
                </div>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post, index) => (
                        <div
                            key={post.slug}
                            className="animate-in fade-in slide-in-from-bottom-4"
                            style={{
                                animationDelay: `${(index + (featured ? 1 : 0)) * 100}ms`,
                                animationDuration: '500ms',
                                animationFillMode: 'both'
                            }}
                        >
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
