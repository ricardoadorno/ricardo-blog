'use client';

import { Project } from '@/lib/types';
import { MyLink } from '@/components/ui/MyLink';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/blog/OptimizedImage';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50",
        "bg-card/30 backdrop-blur-sm transition-all duration-300",
        "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10",
        featured && "md:col-span-2"
      )}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className={cn("relative", featured ? "md:flex md:gap-6" : "")}>
        {/* Thumbnail */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted/30",
            featured
              ? "md:w-1/2 aspect-[16/10] md:aspect-auto"
              : "aspect-video"
          )}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="w-full h-full"
          >
            <OptimizedImage
              src={project.thumbnail}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-lg",
                project.status === 'Active' && "bg-green-500 text-white",
                project.status === 'In Progress' && "bg-yellow-500 text-white",
                project.status === 'Archived' && "bg-gray-500 text-white"
              )}
            >
              {project.status}
            </span>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground shadow-lg">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={cn("p-6 space-y-4", featured && "md:w-1/2 md:flex md:flex-col md:justify-center")}>
          {/* Title */}
          <h3 className={cn(
            "font-bold leading-tight text-foreground",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}>
            {project.title}
          </h3>

          {/* Description */}
          <p className={cn(
            "text-muted-foreground leading-relaxed",
            featured ? "line-clamp-4 text-base" : "line-clamp-3 text-sm"
          )}>
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs text-muted-foreground">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>

          {/* Stats */}
          {project.stats && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {project.stats.stars !== undefined && (
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4" />
                  {project.stats.stars.toLocaleString()}
                </span>
              )}
              {project.stats.forks !== undefined && (
                <span className="flex items-center gap-1.5">
                  <GitFork className="w-4 h-4" />
                  {project.stats.forks.toLocaleString()}
                </span>
              )}
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.links.live && (
              <Button asChild variant="gradient" size="sm">
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.links.github && (
              <Button asChild variant="outline" size="sm">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  Code
                </a>
              </Button>
            )}
            {project.links.case_study && (
              <Button asChild variant="outline" size="sm">
                <MyLink href={project.links.case_study} className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Case Study
                </MyLink>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
