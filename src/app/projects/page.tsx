'use client';

import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { MyLink } from '@/components/ui/MyLink';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, Filter } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

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

  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute inset-0 mesh-gradient opacity-20"></div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
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

          {/* Header */}
          <motion.header
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 mb-4"
            >
              <Briefcase className="w-10 h-10 text-primary" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                My <span className="text-gradient-primary">Projects</span>
              </h1>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="h-1 w-32 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-full mx-auto mb-6"
            />
            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              A showcase of my work in web development, open source, and creative experiments
            </motion.p>
          </motion.header>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 justify-center flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-16"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold mb-8"
              >
                <span className="text-gradient-tech">Featured Projects</span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} featured />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* All Projects */}
          {regularProjects.length > 0 && (
            <motion.section
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold mb-8"
              >
                All Projects
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-muted-foreground mb-4">
                No projects found in this category
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-primary hover:underline"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
