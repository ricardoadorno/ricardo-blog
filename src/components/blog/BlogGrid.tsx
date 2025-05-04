import { PostData } from "@/lib/markdown";
import { BlogCard } from "./BlogCard";

interface BlogGridProps {
    posts: PostData[];
}

export function BlogGrid({ posts }: BlogGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>
    );
}