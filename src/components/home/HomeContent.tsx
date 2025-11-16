"use client";

import { PostMeta } from "@/lib/types";
import { motion } from "framer-motion";
import { BentoGrid, BentoCard } from "./BentoGrid";
import {
  HeroCard,
  AboutCard,
  SkillsCard,
  FeaturedPostCard,
  ContactCard,
  CurrentFocusCard,
  BlogStatsCard,
  CTACard,
} from "./BentoCards";
import { MeshGradient, GridPattern, GrainTexture } from "@/components/ui/BackgroundTextures";
import { Sparkles } from "lucide-react";

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

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Main Introduction Section */}
          <BentoGrid>
            {/* Hero Card - Main introduction */}
            <BentoCard span="2" rowSpan="2" gradient>
              <HeroCard />
            </BentoCard>

            {/* About Card */}
            <BentoCard span="1" rowSpan="1" gradient>
              <AboutCard />
            </BentoCard>

            {/* Blog Stats */}
            <BentoCard span="1" rowSpan="1" gradient>
              <BlogStatsCard />
            </BentoCard>

            {/* Skills Card - Wider */}
            <BentoCard span="2" rowSpan="1" gradient>
              <SkillsCard />
            </BentoCard>

            {/* Current Focus */}
            <BentoCard span="1" rowSpan="1" gradient>
              <CurrentFocusCard />
            </BentoCard>

            {/* Contact Card */}
            <BentoCard span="1" rowSpan="1" gradient>
              <ContactCard />
            </BentoCard>
          </BentoGrid>

          {/* Featured Posts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-primary" />
                  Featured Articles
                </h2>
                <p className="text-muted-foreground">Latest insights and tutorials</p>
              </div>
            </div>

            <BentoGrid>
              {/* First post takes more space */}
              {featuredPosts[0] && (
                <BentoCard span="2" rowSpan="2" gradient>
                  <FeaturedPostCard post={featuredPosts[0]} />
                </BentoCard>
              )}

              {/* Remaining posts */}
              {featuredPosts.slice(1, 3).map((post) => (
                <BentoCard key={post.slug} span="1" rowSpan="2" gradient>
                  <FeaturedPostCard post={post} />
                </BentoCard>
              ))}

              {/* CTA Card */}
              <BentoCard span="2" rowSpan="1" gradient>
                <CTACard />
              </BentoCard>
            </BentoGrid>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
