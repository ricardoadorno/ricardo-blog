"use client";

import { PostMeta } from "@/lib/types";
import { MyLink } from "@/components/ui/MyLink";
import { OptimizedImage } from '@/components/blog/OptimizedImage';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface HomeContentProps {
  featuredPosts: PostMeta[];
}

export function HomeContent({ featuredPosts }: HomeContentProps) {
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
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute inset-0 mesh-gradient opacity-20"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
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
                  Hi, I&apos;m <span className="text-primary">Ricardo</span>
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
              <div className="relative">
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-2xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-border/50 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10">
                  {/* Replace with your profile image */}
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/80 text-7xl font-bold">
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
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Featured Posts
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
                {featuredPosts.map((post) => (
                  <motion.div
                    key={post.slug}
                    className="group border border-border/50 rounded-lg hover:border-primary/30
                    bg-gradient-to-br from-muted/30 via-background to-muted/50
                    hover:from-primary/5 hover:via-background hover:to-primary/10
                    shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative bg-muted/30">
                        {post.coverImage ? (
                          <OptimizedImage
                            src={post.coverImage}
                            alt={post.title}
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50"></div>
                        )}
                      </div>
                      <div className="p-6 space-y-3 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold line-clamp-2 leading-tight">
                          <MyLink href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</MyLink>
                        </h3>
                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                        <MyLink
                          href={`/blog/${post.slug}`}
                          className="text-primary inline-flex items-center gap-2 group/link text-sm font-medium hover:underline"
                        >
                          <span>Read more</span>
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
        <section className="py-24 relative bg-muted/20">
          <div className="container mx-auto px-6 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Skills & Expertise
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
                  { name: "React", icon: "⚛️" },
                  { name: "Next.js", icon: "▲" },
                  { name: "TypeScript", icon: "TS" },
                  { name: "Node.js", icon: "🟢" },
                  { name: "Tailwind CSS", icon: "🌊" },
                  { name: "UI/UX Design", icon: "🎨" },
                  { name: "GraphQL", icon: "⬢" },
                  { name: "DevOps", icon: "🔄" }
                ].map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="group border border-border/50 rounded-lg p-6
                    bg-gradient-to-br from-muted/30 via-background to-muted/50
                    hover:border-primary/30 hover:from-primary/5 hover:via-background hover:to-primary/10
                    shadow-sm hover:shadow-md transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-3xl mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill.icon}
                      </motion.div>
                      <h3 className="font-semibold text-foreground">{skill.name}</h3>
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
        <section className="py-24 pb-32">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-4xl mx-auto text-center border border-border/50 rounded-lg p-12
              bg-gradient-to-br from-muted/30 via-background to-muted/50 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let&apos;s <span className="text-primary">Connect</span>
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
