import { getSortedPostsData, getAllTags } from "@/lib/mdx";
import { BlogContent } from "@/components/blog/BlogContent";

export default function BlogIndexPage() {
    const posts = getSortedPostsData();
    const tags = getAllTags();

    return <BlogContent posts={posts} tags={tags} />;
}