"use client";

import { getSortedPostsData } from "@/lib/mdx";
import { MyLink } from "@/components/ui/MyLink";
import { OptimizedImage } from '@/components/blog/OptimizedImage';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function Home() {
  const allPosts = getSortedPostsData();
  const featuredPosts = allPosts.slice(0, 3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <div className="relative">
      {/* Animated Mesh Gradient Background */}
      <div className="fixed inset-0 -z-10 mesh-gradient"></div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2 space-y-8"
              initial="hidden"
              animate="visible"
              variants={heroVariants}
            >
              <motion.div className="space-y-4" variants={containerVariants}>
                <motion.h1
                  className="text-5xl md:text-7xl font-bold"
                  variants={itemVariants}
                >
                  Hi, I&apos;m <span className="text-gradient-neon">Ricardo</span>
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
                  variants={itemVariants}
                >
                  Web developer, designer, and technology enthusiast. I write about modern web development,
                  design patterns, and emerging technologies.
                </motion.p>
              </motion.div>
              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
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
              </motion.div>
            </motion.div>
            <motion.div
              className="lg:w-1/2 flex justify-center"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              <div className="relative float-animation">
                <motion.div
                  className="absolute inset-0 bg-gradient-neon rounded-full blur-3xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glass shadow-2xl glow-purple">
                  {/* Replace with your profile image */}
                  <div className="absolute inset-0 gradient-neon flex items-center justify-center text-white text-7xl font-bold">
                    R
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-gradient-primary">Featured Posts</span>
                </h2>
                <p className="text-muted-foreground text-lg">Latest thoughts and tutorials</p>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    className="group card-gradient-border hover:scale-105 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                        <motion.div
                          className="absolute inset-0 bg-gradient-neon"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 0.2 }}
                          transition={{ duration: 0.3 }}
                        ></motion.div>
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
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button asChild variant="gradientNeon" size="lg">
                  <MyLink href="/blog">
                    View All Posts →
                  </MyLink>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Skills & Expertise */}
      <RevealOnScroll>
        <section className="py-20 relative">
          <div className="absolute inset-0 frosted-bg"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-gradient-tech">Skills & Expertise</span>
                </h2>
                <p className="text-muted-foreground text-lg">Technologies I work with</p>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { name: "React", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
                  { name: "Next.js", icon: "▲", color: "from-gray-800 to-gray-600" },
                  { name: "TypeScript", icon: "TS", color: "from-blue-600 to-blue-400" },
                  { name: "Node.js", icon: "🟢", color: "from-green-600 to-green-400" },
                  { name: "Tailwind CSS", icon: "🌊", color: "from-teal-500 to-cyan-500" },
                  { name: "UI/UX Design", icon: "🎨", color: "from-purple-500 to-pink-500" },
                  { name: "GraphQL", icon: "⬢", color: "from-pink-500 to-rose-500" },
                  { name: "DevOps", icon: "🔄", color: "from-orange-500 to-red-500" }
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group glass-card hover:glow-purple transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {skill.icon}
                      </motion.div>
                      <h3 className="font-semibold">{skill.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* CTA Section */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center glass-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let&apos;s <span className="text-gradient-neon">Connect</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Interested in collaboration or have a question? Feel free to reach out!
              </p>
              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
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
              </motion.div>
            </motion.div>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
