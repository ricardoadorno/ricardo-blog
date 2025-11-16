'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  position?: 'sticky' | 'inline';
  className?: string;
}

export function SocialShare({
  url,
  title,
  position = 'inline',
  className,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  if (position === 'sticky') {
    return (
      <div
        className={cn(
          'sticky top-24 hidden xl:block',
          className
        )}
      >
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Share</p>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('twitter')}
            className="w-full justify-start gap-2"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-4 h-4" />
            <span className="text-xs">Twitter</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('linkedin')}
            className="w-full justify-start gap-2"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-xs">LinkedIn</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('facebook')}
            className="w-full justify-start gap-2"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-4 h-4" />
            <span className="text-xs">Facebook</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="w-full justify-start gap-2"
            aria-label="Copy link"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon className="w-4 h-4" />
                <span className="text-xs">Copy Link</span>
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Inline version (mobile and tablet)
  return (
    <div className={cn('border-t border-b border-border/50 py-6 my-8', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold mb-1">Share this article</h3>
          <p className="text-sm text-muted-foreground">
            Help others discover this content
          </p>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="gap-2"
            aria-label="Share article"
            aria-expanded={isOpen}
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>

          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsOpen(false)}
                  aria-hidden="true"
                />

                {/* Share menu */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 z-50 w-48 rounded-lg border border-border/50 bg-background shadow-lg"
                >
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        handleShare('twitter');
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </button>

                    <button
                      onClick={() => {
                        handleShare('linkedin');
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </button>

                    <button
                      onClick={() => {
                        handleShare('facebook');
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </button>

                    <div className="border-t border-border/50 my-1" />

                    <button
                      onClick={() => {
                        copyToClipboard();
                        setTimeout(() => setIsOpen(false), 1000);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-4 h-4" />
                          Copy Link
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
