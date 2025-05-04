import { getSortedPostsData } from "@/lib/markdown";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { TagCloud } from "@/components/blog/TagCloud";
import Link from "next/link";
import { Metadata } from "next";
import fs from 'fs';
import path from 'path';

export function generateStaticParams() {
    // Get all post tag from markdown files
    const fileNames = fs.readdirSync(path.join(process.cwd(), 'src/content/posts'));

    // Create the appropriate params object for each tag
    return fileNames.map((fileName) => {
        return {
            tag: fileName.replace(/\.md$/, ''),
        };
    });
}

// Generate metadata for each tag page
export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
    // Await the params before using them
    const { tag } = await params;
    const tagDecodded = decodeURIComponent(tag);

    return {
        title: `Posts tagged with "${tagDecodded}" | Ricardo's Blog`,
        description: `Browse all posts tagged with "${tagDecodded}" on Ricardo's Blog`,
    };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {

    const { tag } = await params;
    const tagDecodded = decodeURIComponent(tag);

    const allPosts = getSortedPostsData();

    // Filter posts by tag
    const filteredPosts = allPosts.filter(post =>
        post.tags?.includes(tagDecodded)
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
                        Posts tagged with {tagDecodded}
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-1">
                        <TagCloud posts={allPosts} selectedTag={tagDecodded} />
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