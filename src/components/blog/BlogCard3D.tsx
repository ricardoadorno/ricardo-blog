'use client';

import { MyLink } from '@/components/ui/MyLink';
import { PostMeta } from '@/lib/types';
import { OptimizedImage } from './OptimizedImage';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

interface BlogCard3DProps {
  post: PostMeta;
  featured?: boolean;
}

export function BlogCard3D({ post, featured = false }: BlogCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative overflow-visible",
        featured && "md:col-span-2 lg:col-span-3"
      )}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.article
        className={cn(
          "relative overflow-hidden rounded-xl border border-border/50",
          "bg-card/50 backdrop-blur-sm transition-all duration-500",
          "hover:border-primary/40"
        )}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient border glow */}
        <motion.div
          className="absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, oklch(70% 0.22 285), oklch(72% 0.25 305), oklch(60% 0.18 240))',
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: isHovered ? 0.5 : 0,
          }}
        />

        {/* Lighting effect that follows mouse */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, oklch(70% 0.22 285 / 0.2), transparent 50%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className={cn("relative", featured ? "md:flex md:gap-6" : "")}>
          {/* Cover Image */}
          {post.coverImage && (
            <motion.div
              className={cn(
                "relative overflow-hidden bg-muted/30",
                featured
                  ? "md:w-1/2 aspect-[16/10] md:aspect-auto"
                  : "aspect-video"
              )}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(20px)',
              }}
            >
              <motion.div
                animate={{
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                className="w-full h-full"
              >
                <OptimizedImage
                  src={post.coverImage}
                  alt={`Cover image for ${post.title}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Category badge with 3D effect */}
              {post.category && (
                <motion.div
                  className="absolute top-4 left-4"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(40px)',
                  }}
                >
                  <motion.span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {post.category}
                  </motion.span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Content with 3D layering */}
          <div className={cn("p-6 space-y-4", featured && "md:w-1/2 md:flex md:flex-col md:justify-center")}>
            {/* Title with 3D elevation */}
            <motion.h2
              className={cn(
                "font-bold leading-tight",
                featured ? "text-2xl md:text-3xl" : "text-xl"
              )}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(30px)',
              }}
            >
              <MyLink
                href={`/blog/${post.slug}`}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                {post.title}
              </MyLink>
            </motion.h2>

            {/* Meta with subtle 3D */}
            <motion.div
              className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(20px)',
              }}
            >
              <time dateTime={post.date} className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
            </motion.div>

            {/* Excerpt */}
            <motion.p
              className={cn(
                "text-muted-foreground leading-relaxed",
                featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"
              )}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(25px)',
              }}
            >
              {post.excerpt}
            </motion.p>

            {/* Tags with 3D elevation */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(30px)',
                }}
              >
                {post.tags.slice(0, 3).map((tag) => (
                  <MyLink
                    key={tag}
                    href={`/tag/${tag}`}
                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    #{tag}
                  </MyLink>
                ))}
                {post.tags.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-1 text-xs text-muted-foreground">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </motion.div>
            )}

            {/* Read More Link with elevated 3D */}
            <motion.div
              className="pt-2"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(35px)',
              }}
            >
              <MyLink
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary group/link"
              >
                <span>Read article</span>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </MyLink>
            </motion.div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-xl"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, oklch(99% 0 0 / 0.1) 50%, transparent 100%)',
            transform: 'translateX(-100%)',
          }}
          animate={{
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </motion.article>
    </motion.div>
  );
}
