import { getSortedPostsData } from "@/lib/mdx";
import { HomeContent } from "@/components/home/HomeContent";

export default function Home() {
  const allPosts = getSortedPostsData();
  const featuredPosts = allPosts.slice(0, 3);

  return <HomeContent featuredPosts={featuredPosts} />;
}
