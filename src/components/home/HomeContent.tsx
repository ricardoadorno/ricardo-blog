"use client";

import { MyLink } from "@/components/ui/MyLink";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  Award,
  Briefcase,
  Code2,
  CheckCircle2,
  Cloud,
  Lock,
  Layers,
  GitBranch,
  Server,
  Cpu,
  Shield,
  Boxes,
  Network,
  Mail,
  Linkedin,
  Github
} from "lucide-react";

export function HomeContent() {
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

  // Data structures
  const stats = [
    { label: "Years Experience", value: "10+", icon: Briefcase },
    { label: "Projects Completed", value: "150+", icon: CheckCircle2 },
    { label: "Certifications", value: "8", icon: Award },
    { label: "Technologies", value: "25+", icon: Code2 },
  ];

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2024",
      icon: Cloud,
      color: "from-orange-500/20 to-yellow-500/20"
    },
    {
      name: "Azure Solutions Architect Expert",
      issuer: "Microsoft",
      year: "2024",
      icon: Cloud,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      name: "Google Cloud Professional Architect",
      issuer: "Google Cloud",
      year: "2023",
      icon: Cloud,
      color: "from-red-500/20 to-yellow-500/20"
    },
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      year: "2023",
      icon: Shield,
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      name: "Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      year: "2024",
      icon: Boxes,
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      name: "HashiCorp Terraform Associate",
      issuer: "HashiCorp",
      year: "2023",
      icon: Layers,
      color: "from-purple-500/20 to-indigo-500/20"
    }
  ];

  const expertise = [
    {
      title: "Cloud Architecture",
      description: "Design and implementation of scalable cloud solutions on AWS, Azure, and GCP",
      icon: Cloud,
      skills: ["AWS", "Azure", "GCP", "Multi-Cloud"]
    },
    {
      title: "DevOps & CI/CD",
      description: "Automation, continuous integration and deployment pipelines",
      icon: GitBranch,
      skills: ["Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD"]
    },
    {
      title: "Security & Compliance",
      description: "Implementation of security best practices and compliance standards",
      icon: Lock,
      skills: ["IAM", "Zero Trust", "SOC 2", "ISO 27001"]
    },
    {
      title: "Infrastructure as Code",
      description: "Automated infrastructure provisioning and management",
      icon: Code2,
      skills: ["Terraform", "CloudFormation", "Ansible", "Pulumi"]
    },
    {
      title: "Container Orchestration",
      description: "Kubernetes, Docker, and container-based architectures",
      icon: Boxes,
      skills: ["Kubernetes", "Docker", "Helm", "ECS/EKS"]
    },
    {
      title: "System Design",
      description: "High-availability, fault-tolerant distributed systems",
      icon: Network,
      skills: ["Microservices", "Event-Driven", "Serverless", "Load Balancing"]
    }
  ];

  const techStack = {
    "Cloud Platforms": ["AWS", "Azure", "Google Cloud", "DigitalOcean"],
    "Languages": ["Python", "Go", "JavaScript/TypeScript", "Bash"],
    "DevOps Tools": ["Docker", "Kubernetes", "Terraform", "Ansible"],
    "Databases": ["PostgreSQL", "MongoDB", "Redis", "DynamoDB"],
    "Monitoring": ["Prometheus", "Grafana", "ELK Stack", "CloudWatch"],
    "CI/CD": ["Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD"]
  };

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute inset-0 mesh-gradient opacity-20"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <motion.div
              className="lg:w-1/2 space-y-8"
              initial="hidden"
              animate="visible"
              variants={heroVariants}
            >
              <motion.div className="space-y-6" variants={containerVariants}>
                <motion.div
                  className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary"
                  variants={itemVariants}
                >
                  <span className="inline-flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    IT Professional & Solutions Architect
                  </span>
                </motion.div>
                <motion.h1
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  variants={itemVariants}
                >
                  Hi, I&apos;m <span className="text-primary">Ricardo</span>
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
                  variants={itemVariants}
                >
                  Specialized in designing and implementing scalable cloud solutions,
                  DevOps automation, and secure infrastructure architecture.
                </motion.p>
              </motion.div>
              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <Button asChild variant="gradient" size="lg" className="group">
                  <MyLink href="#certifications">
                    View Certifications
                    <Award className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </MyLink>
                </Button>

                <Button asChild variant="glass" size="lg" className="group">
                  <MyLink href="#contact">
                    Contact Me
                    <Mail className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </MyLink>
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex gap-4 pt-4"
                variants={itemVariants}
              >
                <MyLink
                  href="https://github.com/ricardo"
                  className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </MyLink>
                <MyLink
                  href="https://linkedin.com/in/ricardo"
                  className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </MyLink>
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-32 h-32 text-primary/40" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <RevealOnScroll>
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center space-y-2"
                  variants={itemVariants}
                >
                  <stat.icon className="w-8 h-8 mx-auto text-primary" />
                  <div className="text-4xl md:text-5xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Certifications Section */}
      <RevealOnScroll>
        <section id="certifications" className="py-24">
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
                  Professional Certifications
                </h2>
                <p className="text-muted-foreground text-lg">
                  Industry-recognized credentials demonstrating expertise
                </p>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="group border border-border/50 rounded-lg p-6
                    bg-gradient-to-br from-muted/30 via-background to-muted/50
                    hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-4">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center`}>
                        <cert.icon className="w-8 h-8 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                        <p className="text-xs text-primary font-medium">{cert.year}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Expertise Section */}
      <RevealOnScroll>
        <section className="py-24 bg-muted/20">
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
                  Areas of Expertise
                </h2>
                <p className="text-muted-foreground text-lg">
                  Specialized skills and technical domains
                </p>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {expertise.map((area, index) => (
                  <motion.div
                    key={index}
                    className="group border border-border/50 rounded-lg p-6
                    bg-gradient-to-br from-muted/30 via-background to-muted/50
                    hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-4">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <area.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-2">{area.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {area.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {area.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs bg-primary/10 border border-primary/20 rounded-full text-primary font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Tech Stack Section */}
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
                  Technology Stack
                </h2>
                <p className="text-muted-foreground text-lg">
                  Tools and technologies I work with daily
                </p>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {Object.entries(techStack).map(([category, technologies], index) => (
                  <motion.div
                    key={index}
                    className="border border-border/50 rounded-lg p-6
                    bg-gradient-to-br from-muted/30 via-background to-muted/50"
                    variants={itemVariants}
                  >
                    <h3 className="font-bold text-lg mb-4 text-primary">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-sm bg-background border border-border/50 rounded-lg hover:border-primary/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Blog Link Section */}
      <RevealOnScroll>
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Read My Technical Blog
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Insights, tutorials, and best practices on cloud architecture, DevOps, and modern infrastructure
              </p>
              <Button asChild variant="gradientNeon" size="lg">
                <MyLink href="/blog">
                  Explore Articles →
                </MyLink>
              </Button>
            </motion.div>
          </div>
        </section>
      </RevealOnScroll>

      {/* CTA Section */}
      <RevealOnScroll>
        <section id="contact" className="py-24 pb-32">
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
                Let&apos;s Build Something <span className="text-primary">Amazing</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Looking for a cloud architect or DevOps engineer? Let&apos;s discuss how I can help with your next project.
              </p>
              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button asChild variant="gradient" size="lg" className="group">
                  <MyLink href="/about">
                    Get in Touch
                    <Mail className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </MyLink>
                </Button>
                <Button asChild variant="outline" size="lg" className="group">
                  <MyLink href="/blog">
                    View Portfolio
                    <Briefcase className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
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
