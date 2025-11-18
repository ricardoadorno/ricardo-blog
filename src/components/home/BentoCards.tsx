"use client";

import { motion } from "framer-motion";
import { MyLink } from "@/components/ui/MyLink";
import { PostMeta } from "@/lib/types";
import { OptimizedImage } from "@/components/blog/OptimizedImage";
import {
  Code2,
  Rocket,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Calendar,
  TrendingUp,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";

// Hero Card - Clean and focused
export function HeroCard() {
  return (
    <div className="relative h-full flex flex-col justify-center">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for work
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Ricardo Adorno
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            Developer & Designer
          </p>
        </motion.div>
        <motion.p
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Building modern web experiences with React, Next.js, and thoughtful design.
          Exploring the intersection of code and creativity.
        </motion.p>
      </div>
    </div>
  );
}

// About Card - Concise about section
export function AboutCard() {
  return (
    <div className="relative h-full flex flex-col justify-between p-1">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Code2 className="w-5 h-5 shrink-0" />
          <h3 className="text-lg font-bold">About</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Passionate about creating seamless user experiences and writing clean, maintainable code.
          Always learning, always building.
        </p>
      </div>
      <MyLink
        href="/about"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary group/link mt-4"
      >
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
      </MyLink>
    </div>
  );
}

// Stats Card - Show statistics
interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend?: string;
}

export function StatsCard({ icon, value, label, trend }: StatsCardProps) {
  return (
    <div className="relative h-full flex flex-col justify-between">
      <motion.div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 shrink-0"
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <div className="mt-auto">
        <div className="flex items-end gap-2">
          <motion.div
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.div>
          {trend && (
            <span className="text-sm text-green-500 flex items-center mb-1 shrink-0">
              <TrendingUp className="w-3 h-3 mr-1 shrink-0" />
              {trend}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  );
}

// Featured Post Card
interface FeaturedPostCardProps {
  post: PostMeta;
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  return (
    <MyLink href={`/blog/${post.slug}`} className="block h-full group">
      <div className="relative h-full flex flex-col">
        {post.coverImage ? (
          <div className="relative h-48 overflow-hidden rounded-lg mb-4 bg-muted/30">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <OptimizedImage
                src={post.coverImage}
                alt={post.title}
                className="object-cover"
              />
            </motion.div>
            {post.category && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                {post.category}
              </span>
            )}
          </div>
        ) : (
          <div className="h-48 rounded-lg mb-4 bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-primary/50" />
          </div>
        )}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-3">
            <Calendar className="w-3 h-3 shrink-0" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </MyLink>
  );
}

// Contact Card
export function ContactCard() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary shrink-0" />
          <h3 className="text-lg font-bold">Let&apos;s Connect</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Open to collaborations and interesting projects.
        </p>
      </div>
      <div className="flex gap-3 mt-6">
        <motion.a
          href="#"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/30 hover:bg-primary hover:text-primary-foreground transition-colors"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="#"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/30 hover:bg-primary hover:text-primary-foreground transition-colors"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="#"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/30 hover:bg-primary hover:text-primary-foreground transition-colors"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5" />
        </motion.a>
      </div>
    </div>
  );
}

// Skills Card - More comprehensive
export function SkillsCard() {
  const skills = [
    "React", "Next.js", "TypeScript", "Node.js",
    "Tailwind CSS", "Framer Motion", "Git", "UI/UX"
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Rocket className="w-5 h-5 text-primary shrink-0" />
        <h3 className="text-lg font-bold">Skills</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            className="px-3 py-1.5 text-xs font-medium rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Current Focus Card
export function CurrentFocusCard() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary shrink-0" />
          <h3 className="text-lg font-bold">Current Focus</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">▸</span>
            <span>Building scalable web applications</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">▸</span>
            <span>Exploring AI integration in UX</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1 shrink-0">▸</span>
            <span>Writing technical articles</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Blog Stats Card
export function BlogStatsCard() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
        <div className="text-4xl font-bold">24+</div>
        <div className="text-sm text-muted-foreground">Articles Published</div>
      </motion.div>
    </div>
  );
}

// Call to Action Card
export function CTACard() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 rounded-xl"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative space-y-4 px-4">
        <h3 className="text-xl md:text-2xl font-bold">Ready to Read?</h3>
        <p className="text-sm text-muted-foreground">
          Explore articles on web development and design
        </p>
        <MyLink
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors group"
        >
          View All Posts
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
        </MyLink>
      </div>
    </div>
  );
}
