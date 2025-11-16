'use client';

import { MyLink } from "@/components/ui/MyLink";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Code2, Briefcase, Heart, Mail, Github, Linkedin, Twitter, Sparkles, Rocket, Zap } from "lucide-react";

export default function AboutPage() {
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
            },
        },
    };

    const techStack = [
        { name: "Next.js 15", description: "Server-side rendering and static site generation", icon: "▲" },
        { name: "Tailwind CSS", description: "Utility-first styling", icon: "🌊" },
        { name: "shadcn/ui", description: "Beautiful, accessible UI components", icon: "✨" },
        { name: "MDX", description: "Content management with React components", icon: "📝" },
        { name: "Framer Motion", description: "Production-ready animations", icon: "🎬" },
        { name: "TypeScript", description: "Type-safe development", icon: "TS" },
    ];

    return (
        <div className="relative min-h-screen">
            {/* Background gradient */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
                <div className="absolute inset-0 mesh-gradient opacity-20"></div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-5xl mx-auto">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <MyLink
                            href="/"
                            className="inline-flex items-center gap-2 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to home
                        </MyLink>
                    </motion.div>

                    {/* Main Content Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                        className="glass-card border border-border/50 rounded-2xl p-8 md:p-12 mb-10 relative overflow-hidden"
                    >
                        {/* Decorative gradient */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 via-purple-500/5 to-transparent blur-3xl rounded-full -z-10" />

                        {/* Header Section */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-12"
                        >
                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                            >
                                About <span className="text-gradient-primary">Me</span>
                            </motion.h1>
                            <motion.div
                                variants={itemVariants}
                                className="h-1 w-24 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-full"
                            />
                        </motion.div>

                        {/* Profile Section */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col lg:flex-row gap-12 mb-16"
                        >
                            {/* Profile Image */}
                            <motion.div
                                variants={itemVariants}
                                className="lg:w-1/3 flex justify-center lg:justify-start"
                            >
                                <div className="relative group">
                                    <motion.div
                                        className="absolute -inset-4 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
                                        animate={{
                                            scale: [1, 1.05, 1],
                                            rotate: [0, 5, -5, 0],
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl backdrop-blur-sm bg-card/50">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-blue-600 flex items-center justify-center">
                                            <motion.span
                                                className="text-7xl md:text-8xl font-bold text-primary-foreground"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                R
                                            </motion.span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Bio */}
                            <motion.div
                                variants={itemVariants}
                                className="lg:w-2/3 space-y-6"
                            >
                                <div className="prose prose-lg max-w-none dark:prose-invert">
                                    <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
                                        Hi there! I&apos;m <span className="font-semibold text-gradient-primary">Ricardo</span>, a passionate web developer and technology enthusiast.
                                        I specialize in building modern web applications with a focus on <strong>performance</strong>,
                                        <strong> accessibility</strong>, and <strong>user experience</strong>.
                                    </p>
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        This blog is my digital garden where I share my thoughts, experiences, and learnings
                                        about web development, design patterns, and emerging technologies.
                                    </p>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-4 pt-6">
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.05 }}
                                        className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10"
                                    >
                                        <Code2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                                        <div className="text-2xl font-bold text-foreground">5+</div>
                                        <div className="text-xs text-muted-foreground">Years</div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.05 }}
                                        className="text-center p-4 rounded-xl bg-purple-500/5 border border-purple-500/10"
                                    >
                                        <Rocket className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                                        <div className="text-2xl font-bold text-foreground">50+</div>
                                        <div className="text-xs text-muted-foreground">Projects</div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.05 }}
                                        className="text-center p-4 rounded-xl bg-blue-500/5 border border-blue-500/10"
                                    >
                                        <Heart className="w-6 h-6 mx-auto mb-2 text-red-500 fill-red-500" />
                                        <div className="text-2xl font-bold text-foreground">∞</div>
                                        <div className="text-xs text-muted-foreground">Passion</div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Tech Stack Section */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl md:text-4xl font-bold mb-3"
                            >
                                <Sparkles className="inline-block w-8 h-8 mr-2 text-primary" />
                                The <span className="text-gradient-tech">Tech Stack</span>
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-muted-foreground mb-8 text-lg">
                                This blog is built with modern web technologies
                            </motion.p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {techStack.map((tech) => (
                                    <motion.div
                                        key={tech.name}
                                        variants={itemVariants}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        className="group p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center text-2xl">
                                                {tech.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-foreground group-hover:text-gradient-primary transition-all mb-1">
                                                    {tech.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {tech.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Background & Projects */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="prose prose-lg lg:prose-xl max-w-none dark:prose-invert mb-16"
                        >
                            <motion.div variants={itemVariants}>
                                <h2 className="flex items-center gap-2">
                                    <Briefcase className="w-7 h-7 text-primary" />
                                    My Background
                                </h2>
                                <p>
                                    I&apos;ve been working in web development for several years, focusing on creating performant,
                                    accessible, and user-friendly applications. My expertise includes <strong>React</strong>, <strong>TypeScript</strong>,
                                    <strong> Next.js</strong>, and various frontend and backend technologies.
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <h2 className="flex items-center gap-2">
                                    <Zap className="w-7 h-7 text-primary" />
                                    Projects & Expertise
                                </h2>
                                <p>
                                    Throughout my career, I&apos;ve worked on a variety of projects, from e-commerce platforms
                                    to content management systems and data visualization tools. I&apos;m particularly interested
                                    in projects that leverage modern web technologies to solve real-world problems.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="pt-8 border-t border-border/50"
                        >
                            <motion.h3
                                variants={itemVariants}
                                className="text-2xl md:text-3xl font-bold mb-6"
                            >
                                Let&apos;s <span className="text-gradient-neon">Connect</span>
                            </motion.h3>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-wrap gap-4"
                            >
                                <Button asChild variant="gradient" size="lg" className="group">
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <Twitter className="w-5 h-5" />
                                        Twitter
                                    </a>
                                </Button>

                                <Button asChild variant="outline" size="lg" className="group">
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <Github className="w-5 h-5" />
                                        GitHub
                                    </a>
                                </Button>

                                <Button asChild variant="outline" size="lg" className="group">
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <Linkedin className="w-5 h-5" />
                                        LinkedIn
                                    </a>
                                </Button>

                                <Button asChild variant="gradientNeon" size="lg" className="group">
                                    <a href="mailto:contact@example.com" className="flex items-center gap-2">
                                        <Mail className="w-5 h-5" />
                                        Email Me
                                    </a>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
