import { getSortedPostsData } from "@/lib/markdown";
import { MyLink } from "@/components/ui/MyLink";
import { OptimizedImage } from '@/components/blog/OptimizedImage';

export default function Home() {
  const allPosts = getSortedPostsData();
  const featuredPosts = allPosts.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-16 mb-16 border-b dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Hi, I’m Ricardo
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Web developer, designer, and technology enthusiast. I write about modern web development,
              design patterns, and emerging technologies.
            </p>
            <div className="flex gap-4">
              <MyLink
                href="/about"
                variant="button"
                className="bg-blue-600 hover:bg-blue-700"
              >
                About Me
              </MyLink>

              <MyLink
                href="/blog"
                variant="button"
                className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Read Blog
              </MyLink>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              {/* Replace with your profile image */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                R
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 dark:text-white">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.slug} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:border-gray-800">
                <div className="h-48 bg-gray-100 dark:bg-gray-800 relative">
                  {post.coverImage ? (
                    <OptimizedImage
                      src={post.coverImage}
                      alt={post.title}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    <MyLink href={`/blog/${post.slug}`}>{post.title}</MyLink>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  <MyLink
                    href={`/blog/${post.slug}`}
                  >
                    Read more →
                  </MyLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-16 mb-20 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "React", icon: "⚛️" },
              { name: "Next.js", icon: "▲" },
              { name: "TypeScript", icon: "TS" },
              { name: "Node.js", icon: "🟢" },
              { name: "Tailwind CSS", icon: "🌊" },
              { name: "UI/UX Design", icon: "🎨" },
              { name: "GraphQL", icon: "⬢" },
              { name: "DevOps", icon: "🔄" }
            ].map((skill) => (
              <div key={skill.name} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-2xl mb-4 shadow-sm dark:shadow-gray-700/20">
                  {skill.icon}
                </div>
                <h3 className="font-medium dark:text-white">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
