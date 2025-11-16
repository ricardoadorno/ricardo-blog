"use client";

import { PostMeta } from "@/lib/types";
import { motion } from "framer-motion";
import { BentoGrid, BentoCard } from "./BentoGrid";
import {
  AboutCard,
  SkillsCard,
  ContactCard,
} from "./BentoCards";
import { MeshGradient, GridPattern, GrainTexture } from "@/components/ui/BackgroundTextures";
import { MyLink } from "@/components/ui/MyLink";
import { OptimizedImage } from "@/components/blog/OptimizedImage";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";

interface HomeContentProps {
  featuredPosts: PostMeta[];
}

export function HomeContent({ featuredPosts }: HomeContentProps) {
  return (
    <div className="relative min-h-screen">
      {/* Enhanced Background with textures */}
      <div className="fixed inset-0 -z-10 bg-background">
        <MeshGradient />
        <GridPattern />
        <GrainTexture />
      </div>

      {/* Hero Section - Traditional */}
      <section className="relative">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      Available for work
                    </div>
                  </motion.div>

                  <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Hi, I&apos;m{" "}
                    <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                      Ricardo Adorno
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Developer & Designer crafting modern web experiences with React, Next.js, and thoughtful design.
                  </motion.p>

                  <motion.p
                    className="text-base md:text-lg text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Passionate about creating seamless user experiences and writing clean, maintainable code.
                    Always learning, always building.
                  </motion.p>
                </div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Button asChild size="lg" variant="default" className="group">
                    <MyLink href="/blog">
                      Read My Blog
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </MyLink>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <MyLink href="/about">
                      About Me
                    </MyLink>
                  </Button>
                </motion.div>
              </div>

              {/* Right: Avatar/Image */}
              <motion.div
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-border/50 shadow-2xl bg-gradient-to-br from-primary/10 to-purple-500/10">
                    {/* Replace with your profile image */}
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/80 text-8xl font-bold">
                      R
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Info - Minimal Bento Cards */}
      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <BentoGrid className="gap-4">
              {/* About Card */}
              <BentoCard span="2" rowSpan="1" gradient>
                <AboutCard />
              </BentoCard>

              {/* Contact Card */}
              <BentoCard span="1" rowSpan="1" gradient>
                <ContactCard />
              </BentoCard>

              {/* Skills Card */}
              <BentoCard span="1" rowSpan="1" gradient>
                <SkillsCard />
              </BentoCard>
            </BentoGrid>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                Featured Articles
              </h2>
              <p className="text-lg text-muted-foreground">
                Latest insights and tutorials on web development
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <motion.article
                  key={post.slug}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden bg-muted/30">
                      <OptimizedImage
                        src={post.coverImage}
                        alt={post.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {post.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                          {post.category}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      <MyLink href={`/blog/${post.slug}`}>
                        {post.title}
                      </MyLink>
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild variant="outline" size="lg">
                <MyLink href="/blog">
                  View All Posts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </MyLink>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
