'use client';

import { useState } from 'react';
import { Mail, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulação de submissão
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/10 via-accent/5 to-background p-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Stay Updated
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Get the latest posts delivered right to your inbox. No spam, unsubscribe anytime.
        </p>

        {/* Form */}
        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={cn(
                "flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              )}
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                "px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium",
                "hover:bg-primary/90 transition-colors",
                "disabled:opacity-50 inline-flex items-center justify-center gap-2"
              )}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 motion-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3 text-success motion-fade-in">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <p className="font-medium">Thanks for subscribing!</p>
          </div>
        )}

        {/* Privacy note */}
        <p className="text-xs text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
