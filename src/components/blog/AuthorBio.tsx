'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { MyLink } from '@/components/ui/MyLink';
import { cn } from '@/lib/utils';

interface SocialLink {
  platform: 'twitter' | 'github' | 'linkedin' | 'email';
  url: string;
}

interface AuthorBioProps {
  name: string;
  avatar?: string;
  bio: string;
  socialLinks?: SocialLink[];
  className?: string;
}

const socialIcons = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

const defaultSocialLinks: SocialLink[] = [
  { platform: 'twitter', url: 'https://twitter.com' },
  { platform: 'github', url: 'https://github.com' },
  { platform: 'linkedin', url: 'https://linkedin.com' },
  { platform: 'email', url: 'mailto:contact@ricardo-blog.com' },
];

export function AuthorBio({
  name,
  avatar = '/images/avatar-placeholder.jpg',
  bio,
  socialLinks = defaultSocialLinks,
  className,
}: AuthorBioProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        'p-6 md:p-8 rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-purple-500/5',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-background shadow-lg">
            <Image
              src={avatar}
              alt={`${name}'s avatar`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 80px, 96px"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-3">
            <h3 className="text-xl font-bold mb-1">Written by {name}</h3>
            <p className="text-muted-foreground leading-relaxed">{bio}</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Follow:</span>
            <div className="flex gap-2">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform];
                return (
                  <MyLink
                    key={link.platform}
                    href={link.url}
                    isExternal
                    externalIcon={false}
                    className="p-2 rounded-lg border border-border/50 bg-background/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 group"
                    aria-label={`Follow on ${link.platform}`}
                  >
                    <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                  </MyLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
