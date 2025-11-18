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
import { ArrowRight, Sparkles, Calendar, Code2 } from "lucide-react";

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

      {/* Hero Section - Premium & Dynamic */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Text Content */}
              <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex justify-center lg:justify-start w-full lg:w-auto"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-md shadow-lg shadow-primary/5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                      </span>
                      Available for new projects
                    </div>
                  </motion.div>

                  <div className="space-y-2">
                    <motion.h1
                      className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Crafting <br className="hidden lg:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient-x">
                        Digital Magic
                      </span>
                    </motion.h1>
                    <motion.p
                      className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto lg:mx-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      I'm <span className="font-semibold text-foreground">Ricardo Adorno</span>. I build accessible, pixel-perfect, and performant web experiences that delight users.
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Button asChild size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1">
                    <MyLink href="/blog">
                      Explore My Work
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </MyLink>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full border-2 hover:bg-secondary/50 backdrop-blur-sm transition-all duration-300">
                    <MyLink href="/about">
                      More About Me
                    </MyLink>
                  </Button>
                </motion.div>
              </div>

              {/* Right: Dynamic Visual */}
              <motion.div
                className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              >
                <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
                  {/* Glowing Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-full blur-[100px] animate-pulse" />
                  
                  {/* Rotating Rings */}
                  <motion.div 
                    className="absolute inset-0 border border-primary/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-4 border border-purple-500/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Main Image Container */}
                  <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-background/50 backdrop-blur-sm shadow-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 z-10">
                     <div className="absolute inset-0 flex items-center justify-center text-primary/20">
                        <Sparkles className="w-32 h-32 opacity-50" />
                     </div>
                     {/* Placeholder for actual image */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-purple-500/10" />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 p-4 bg-card/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 z-20"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Code2 className="w-8 h-8 text-primary" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-10 -left-8 p-4 bg-card/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 z-20"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <Sparkles className="w-8 h-8 text-purple-500" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </motion.div>
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
