import { getSortedPostsData } from "@/lib/mdx";
import { MyLink } from "@/components/ui/MyLink";
import { OptimizedImage } from '@/components/blog/OptimizedImage';
import { Button } from "@/components/ui/button";

export default function Home() {
  const allPosts = getSortedPostsData();
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <div className="relative">
      {/* Animated Mesh Gradient Background */}
      <div className="fixed inset-0 -z-10 mesh-gradient"></div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold">
                  Hi, I&apos;m <span className="text-gradient-neon">Ricardo</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Web developer, designer, and technology enthusiast. I write about modern web development,
                  design patterns, and emerging technologies.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="gradient" size="lg" className="group">
                  <MyLink href="/about">
                    About Me
                    <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </MyLink>
                </Button>

                <Button asChild variant="glass" size="lg" className="group">
                  <MyLink href="/blog">
                    Read Blog
                    <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">📚</span>
                  </MyLink>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative float-animation">
                <div className="absolute inset-0 bg-gradient-neon rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glass shadow-2xl glow-purple">
                  {/* Replace with your profile image */}
                  <div className="absolute inset-0 gradient-neon flex items-center justify-center text-white text-7xl font-bold">
                    R
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient-primary">Featured Posts</span>
              </h2>
              <p className="text-muted-foreground text-lg">Latest thoughts and tutorials</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <div
                  key={post.slug}
                  className="group card-gradient-border hover:scale-105 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="card-gradient-border-content h-full">
                    <div className="h-48 rounded-lg overflow-hidden relative mb-4">
                      {post.coverImage ? (
                        <OptimizedImage
                          src={post.coverImage}
                          alt={post.title}
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full gradient-purple-blue"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold line-clamp-2 group-hover:text-gradient-primary transition-all">
                        <MyLink href={`/blog/${post.slug}`}>{post.title}</MyLink>
                      </h3>
                      <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
                      <MyLink
                        href={`/blog/${post.slug}`}
                        className="text-primary inline-flex items-center gap-2 group/link"
                      >
                        <span className="text-gradient-tech">Read more</span>
                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </MyLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="gradientNeon" size="lg">
                <MyLink href="/blog">
                  View All Posts →
                </MyLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20 relative">
        <div className="absolute inset-0 frosted-bg"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient-tech">Skills & Expertise</span>
              </h2>
              <p className="text-muted-foreground text-lg">Technologies I work with</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "React", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
                { name: "Next.js", icon: "▲", color: "from-gray-800 to-gray-600" },
                { name: "TypeScript", icon: "TS", color: "from-blue-600 to-blue-400" },
                { name: "Node.js", icon: "🟢", color: "from-green-600 to-green-400" },
                { name: "Tailwind CSS", icon: "🌊", color: "from-teal-500 to-cyan-500" },
                { name: "UI/UX Design", icon: "🎨", color: "from-purple-500 to-pink-500" },
                { name: "GraphQL", icon: "⬢", color: "from-pink-500 to-rose-500" },
                { name: "DevOps", icon: "🔄", color: "from-orange-500 to-red-500" }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="group glass-card hover:glow-purple transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      {skill.icon}
                    </div>
                    <h3 className="font-semibold">{skill.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center glass-card">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s <span className="text-gradient-neon">Connect</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Interested in collaboration or have a question? Feel free to reach out!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="gradient" size="lg">
                <MyLink href="/about">
                  Get in Touch
                </MyLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <MyLink href="/blog">
                  Read My Work
                </MyLink>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
