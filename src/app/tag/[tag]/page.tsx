import { getSortedPostsData } from "@/lib/markdown";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { TagCloud } from "@/components/blog/TagCloud";
import Link from "next/link";
import { Metadata } from "next";

// Generate static paths for all tags
export async function generateStaticParams() {
    const allPosts = getSortedPostsData();
    const allTags = new Set<string>();

    allPosts.forEach(post => {
        post.tags?.forEach(tag => {
            allTags.add(tag);
        });
    });

    return Array.from(allTags).map(tag => ({
        tag: tag,
    }));
}

// Generate metadata for each tag page
export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
    const tag = decodeURIComponent(params.tag);

    return {
        title: `Posts tagged with "${tag}" | Ricardo's Blog`,
        description: `Browse all posts tagged with "${tag}" on Ricardo's Blog`,
    };
}

export default function TagPage({ params }: { params: { tag: string } }) {
    const allPosts = getSortedPostsData();
    const tag = decodeURIComponent(params.tag);

    // Filter posts by tag
    const filteredPosts = allPosts.filter(post =>
        post.tags?.includes(tag)
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
                        ← Back to home
                    </Link>
                </div>

                <header className="mb-10">
                    <h1 className="text-3xl font-bold mb-4 dark:text-white">
                        Posts tagged with "{tag}"
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-1">
                        <TagCloud posts={allPosts} selectedTag={tag} />
                    </div>

                    <div className="lg:col-span-3">
                        {filteredPosts.length > 0 ? (
                            <BlogGrid posts={filteredPosts} />
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500 dark:text-gray-400">No posts found with this tag.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}