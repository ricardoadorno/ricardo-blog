"use client";

import { motion } from "framer-motion";
import { MyLink } from "@/components/ui/MyLink";
import { PostMeta } from "@/lib/types";
import { OptimizedImage } from "@/components/blog/OptimizedImage";
import {
  Code2,
  Palette,
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

// Hero Card - Large featured card
interface HeroCardProps {
  title: string;
  subtitle: string;
  description: string;
}

export function HeroCard({ title, subtitle, description }: HeroCardProps) {
  return (
    <div className="relative h-full flex flex-col justify-between">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 rounded-xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {title}
            <span className="text-primary"> {subtitle}</span>
          </h1>
        </motion.div>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>
      <motion.div
        className="relative flex gap-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MyLink
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors group"
        >
          Read Blog
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </MyLink>
        <MyLink
          href="/about"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors"
        >
          About Me
        </MyLink>
      </motion.div>
    </div>
  );
}

// Profile Card - Visual profile card
export function ProfileCard() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 rounded-full blur-2xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 border-2 border-border/50 flex items-center justify-center text-6xl font-bold shadow-lg mb-4"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        R
      </motion.div>
      <h3 className="text-xl font-bold mb-2">Ricardo Adorno</h3>
      <p className="text-sm text-muted-foreground">Developer & Designer</p>
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
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20"
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
            <span className="text-sm text-green-500 flex items-center mb-1">
              <TrendingUp className="w-3 h-3 mr-1" />
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
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </MyLink>
  );
}

// Quick Links Card
interface QuickLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export function QuickLinksCard() {
  const links: QuickLink[] = [
    { icon: <BookOpen className="w-4 h-4" />, label: "Blog", href: "/blog" },
    { icon: <Code2 className="w-4 h-4" />, label: "Projects", href: "/about" },
    { icon: <Mail className="w-4 h-4" />, label: "Contact", href: "/about" },
  ];

  return (
    <div className="h-full flex flex-col gap-2">
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        Quick Links
      </h3>
      <div className="space-y-2">
        {links.map((link, index) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MyLink
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {link.icon}
              </div>
              <span className="text-sm font-medium">{link.label}</span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </MyLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Skills Card
export function SkillsCard() {
  const skills = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "TS" },
    { name: "Tailwind", icon: "🌊" },
  ];

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Code2 className="w-5 h-5 text-primary" />
        Tech Stack
      </h3>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl mb-1">{skill.icon}</div>
            <div className="text-xs font-medium text-center">{skill.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Social Links Card
export function SocialLinksCard() {
  const socials = [
    { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "#" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <h3 className="text-lg font-bold mb-4">Connect</h3>
      <div className="flex gap-3 justify-center">
        {socials.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted/30 hover:bg-primary hover:text-primary-foreground transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label={social.label}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
}

// Recent Activity Card
export function RecentActivityCard() {
  const activities = [
    { text: "Published new article", time: "2 days ago" },
    { text: "Updated portfolio", time: "1 week ago" },
    { text: "Started new project", time: "2 weeks ago" },
  ];

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Rocket className="w-5 h-5 text-primary" />
        Recent Activity
      </h3>
      <div className="space-y-3 flex-1">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Quote/Motto Card
export function QuoteCard() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-6 relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 rounded-xl"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative">
        <Palette className="w-12 h-12 text-primary mx-auto mb-4" />
        <blockquote className="text-lg md:text-xl font-medium leading-relaxed">
          &quot;Design is not just what it looks like. Design is how it works.&quot;
        </blockquote>
        <p className="text-sm text-muted-foreground mt-3">— Steve Jobs</p>
      </div>
    </div>
  );
}
