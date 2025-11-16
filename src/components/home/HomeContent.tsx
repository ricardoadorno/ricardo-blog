"use client";

import { PostMeta } from "@/lib/types";
import { motion } from "framer-motion";
import { BentoGrid, BentoCard } from "./BentoGrid";
import {
  HeroCard,
  ProfileCard,
  StatsCard,
  FeaturedPostCard,
  QuickLinksCard,
  SkillsCard,
  SocialLinksCard,
  RecentActivityCard,
  QuoteCard,
} from "./BentoCards";
import { Code2, BookOpen, Zap } from "lucide-react";

interface HomeContentProps {
  featuredPosts: PostMeta[];
}

export function HomeContent({ featuredPosts }: HomeContentProps) {
  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"></div>
        <div className="absolute inset-0 mesh-gradient opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Bento Grid Layout */}
          <BentoGrid className="mb-8">
            {/* Hero Card - Large, spans multiple columns */}
            <BentoCard span="2" rowSpan="2" gradient>
              <HeroCard
                title="Hi, I'm"
                subtitle="Ricardo"
                description="Web developer, designer, and technology enthusiast. I write about modern web development, design patterns, and emerging technologies."
              />
            </BentoCard>

            {/* Profile Card */}
            <BentoCard span="1" rowSpan="2" gradient>
              <ProfileCard />
            </BentoCard>

            {/* Stats Cards */}
            <BentoCard span="1" gradient>
              <StatsCard
                icon={<BookOpen className="w-6 h-6 text-primary" />}
                value="24"
                label="Articles Published"
                trend="+3"
              />
            </BentoCard>

            {/* Quick Links */}
            <BentoCard span="1" rowSpan="2" gradient>
              <QuickLinksCard />
            </BentoCard>

            {/* Stats Card */}
            <BentoCard span="1" gradient>
              <StatsCard
                icon={<Code2 className="w-6 h-6 text-primary" />}
                value="12"
                label="Projects Completed"
              />
            </BentoCard>

            {/* Skills Card */}
            <BentoCard span="1" rowSpan="2" gradient>
              <SkillsCard />
            </BentoCard>

            {/* Quote Card */}
            <BentoCard span="2" gradient>
              <QuoteCard />
            </BentoCard>
          </BentoGrid>

          {/* Featured Posts Section with Bento Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                Featured Posts
              </h2>
              <p className="text-muted-foreground">Latest thoughts and tutorials</p>
            </div>

            <BentoGrid>
              {featuredPosts.slice(0, 3).map((post, index) => (
                <BentoCard
                  key={post.slug}
                  span={index === 0 ? "2" : "1"}
                  rowSpan={index === 0 ? "2" : "2"}
                  gradient
                >
                  <FeaturedPostCard post={post} />
                </BentoCard>
              ))}

              {/* Social Links Card */}
              <BentoCard span="1" gradient>
                <SocialLinksCard />
              </BentoCard>

              {/* Recent Activity */}
              <BentoCard span="2" gradient>
                <RecentActivityCard />
              </BentoCard>

              {/* Another Stats Card */}
              <BentoCard span="1" gradient>
                <StatsCard
                  icon={<Zap className="w-6 h-6 text-primary" />}
                  value="5K"
                  label="Monthly Readers"
                  trend="+12%"
                />
              </BentoCard>
            </BentoGrid>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
