'use client';

import { motion } from 'framer-motion';
import { Mail, Twitter, Github, Linkedin, MapPin, Clock, Send } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { MyLink } from '@/components/ui/MyLink';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@ricardo-blog.com',
    href: 'mailto:contact@ricardo-blog.com',
    description: 'Best for detailed inquiries',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    value: '@ricardo_dev',
    href: 'https://twitter.com',
    description: 'Quick questions and networking',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@ricardo',
    href: 'https://github.com',
    description: 'Open source collaborations',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Ricardo',
    href: 'https://linkedin.com',
    description: 'Professional networking',
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 mb-6"
            >
              <Send className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let&apos;s{' '}
              <span className="text-gradient-primary">
                Connect
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Have a project in mind? Want to collaborate? Or just want to say hi?
              I&apos;d love to hear from you!
            </p>

            {/* Availability Status */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Available for new projects
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and I&apos;ll get back to you within 24-48 hours.
                </p>
              </div>

              <ContactForm />
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Other Contact Methods */}
              <div>
                <h3 className="text-xl font-bold mb-4">Other Ways to Reach Me</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={method.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <MyLink
                        href={method.href}
                        isExternal
                        externalIcon={false}
                        className="group block p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <method.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">{method.label}</h4>
                              <span className="text-xs text-muted-foreground">↗</span>
                            </div>
                            <p className="text-sm text-primary font-mono truncate mb-1">
                              {method.value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </MyLink>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                {/* Location */}
                <div className="p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Location</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Remote · Working globally
                  </p>
                </div>

                {/* Response Time */}
                <div className="p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Response Time</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Usually within 24-48 hours
                  </p>
                </div>
              </div>

              {/* What I'm Looking For */}
              <div className="p-6 rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-purple-500/5">
                <h4 className="font-semibold mb-3">I&apos;m interested in:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Freelance web development projects
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Technical consulting opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Open source collaborations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Speaking engagements and workshops
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">What type of projects do you work on?</h3>
                <p className="text-sm text-muted-foreground">
                  I specialize in modern web applications using React, Next.js, TypeScript, and Node.js.
                  I work on everything from landing pages to complex full-stack applications.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">What&apos;s your typical project timeline?</h3>
                <p className="text-sm text-muted-foreground">
                  It varies based on project complexity. Small projects can be completed in 1-2 weeks,
                  while larger applications may take 1-3 months. I&apos;ll provide a detailed timeline during our initial consultation.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Do you work with clients internationally?</h3>
                <p className="text-sm text-muted-foreground">
                  Absolutely! I work remotely with clients worldwide. I&apos;m flexible with time zones
                  and can adjust my schedule to ensure smooth communication.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
