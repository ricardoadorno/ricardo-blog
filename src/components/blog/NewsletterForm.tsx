'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'compact' | 'sidebar';
  className?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterForm({
  title = 'Subscribe to Newsletter',
  description = 'Get the latest articles and insights delivered directly to your inbox. No spam, unsubscribe anytime.',
  variant = 'default',
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // TODO: Replace with actual newsletter service (ConvertKit, Mailchimp, etc.)
      // Example: await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus('success');
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setErrorMessage('Failed to subscribe. Please try again.');

      // Reset after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (variant === 'sidebar') {
    return (
      <div className={cn('p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm', className)}>
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground">
              Weekly insights in your inbox
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={status === 'loading' || status === 'success'}
            className={cn(
              'w-full px-3 py-2 text-sm rounded-md border transition-all',
              'bg-background/50 backdrop-blur-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
              'placeholder:text-muted-foreground/60',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              errorMessage ? 'border-red-500' : 'border-border/50'
            )}
          />

          {errorMessage && status === 'idle' && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errorMessage}
            </p>
          )}

          {status === 'success' && (
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Subscribed successfully!
            </p>
          )}

          <Button
            type="submit"
            size="sm"
            disabled={status === 'loading' || status === 'success'}
            className="w-full"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle className="w-3 h-3 mr-2" />
                Subscribed!
              </>
            ) : (
              <>
                <Send className="w-3 h-3 mr-2" />
                Subscribe
              </>
            )}
          </Button>
        </form>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('', className)}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading' || status === 'success'}
            className={cn(
              'flex-1 px-4 py-2 rounded-lg border transition-all',
              'bg-background/50 backdrop-blur-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
              'placeholder:text-muted-foreground/60',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              errorMessage ? 'border-red-500' : 'border-border/50'
            )}
          />

          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="gap-2"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Subscribe</span>
          </Button>
        </form>

        {errorMessage && status === 'idle' && (
          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </p>
        )}

        {status === 'success' && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Thank you for subscribing!
          </p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('p-8 rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-purple-500/5', className)}>
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 mb-4"
        >
          <Mail className="w-8 h-8 text-white" />
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === 'loading' || status === 'success'}
              className={cn(
                'flex-1 px-4 py-3 rounded-lg border transition-all',
                'bg-background/50 backdrop-blur-sm',
                'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                'placeholder:text-muted-foreground/60',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                errorMessage ? 'border-red-500' : 'border-border/50'
              )}
            />

            <Button
              type="submit"
              size="lg"
              disabled={status === 'loading' || status === 'success'}
              className="gap-2 sm:w-auto w-full"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Subscribing...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Subscribe
                </>
              )}
            </Button>
          </div>

          {errorMessage && status === 'idle' && (
            <p className="text-sm text-red-500 flex items-center justify-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errorMessage}
            </p>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-green-500/10 border border-green-500/20"
            >
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Thank you for subscribing! Check your email to confirm.
              </p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
            >
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errorMessage}
              </p>
            </motion.div>
          )}
        </form>

        <p className="text-xs text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
