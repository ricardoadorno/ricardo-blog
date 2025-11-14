import { getSortedPostsData, getAllTags } from "@/lib/mdx";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { TagCloud } from "@/components/blog/TagCloud";
import { Search } from "@/components/blog/Search";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Ricardo's Blog",
    description: "Browse all articles on web development, design, and technology",
};

export default function BlogIndexPage() {
    const posts = getSortedPostsData();
    const tags = getAllTags();

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
                        ← Back to home
                    </Link>
                </div>

                <header className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Blog</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Explore articles about web development, design patterns, and technology
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <aside className="lg:col-span-1">
                        <TagCloud tags={tags} className="mb-8" />
                    </aside>

                    <div className="lg:col-span-3">
                        <Search posts={posts} />

                        <section className="mt-8">
                            <h2 className="text-2xl font-bold mb-6 dark:text-white">Latest Articles</h2>
                            <BlogGrid posts={posts} featured={true} />
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}