import { getSortedPostsData } from "@/lib/markdown";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { TagCloud } from "@/components/blog/TagCloud";
import { Search } from "@/components/blog/Search";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Ricardo's Blog</h1>
          <p className="text-xl text-gray-600">
            Thoughts on web development, design, and technology
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <TagCloud posts={posts} />
          </div>

          <div className="lg:col-span-3">
            <Search posts={posts} />

            <section>
              <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
              <BlogGrid posts={posts} />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
