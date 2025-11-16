import { getSortedPostsData } from "@/lib/mdx";
import { HomeContent } from "@/components/home/HomeContent";
import { projects } from "@/data/projects";

export default function Home() {
  const allPosts = getSortedPostsData();
  const featuredPosts = allPosts.slice(0, 3);
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return <HomeContent featuredPosts={featuredPosts} featuredProjects={featuredProjects} />;
}
