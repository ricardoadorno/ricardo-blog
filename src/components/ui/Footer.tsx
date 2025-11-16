'use client';

import { MyLink } from './MyLink';
import { NewsletterForm } from '../blog/NewsletterForm';
import { motion } from 'framer-motion';
import { Heart, Rss, Mail, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
    const footerLinks = {
        sitemap: [
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/blog', label: 'Blog' },
            { href: '/projects', label: 'Projects' },
        ],
        resources: [
            { href: '/uses', label: 'Uses' },
            { href: '/contact', label: 'Contact' },
            { href: '/rss.xml', label: 'RSS Feed', external: true },
        ],
        social: [
            { href: 'twitter', label: 'Twitter', icon: Twitter },
            { href: 'github', label: 'GitHub', icon: Github },
            { href: 'linkedin', label: 'LinkedIn', icon: Linkedin },
            { href: 'email', label: 'Email', icon: Mail },
        ],
    };

    return (
        <footer className="relative mt-20 border-t border-border/50 backdrop-blur-sm bg-card/30">
            {/* Top gradient decoration */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>

            <div className="container mx-auto px-4 py-16">
                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto mb-16"
                >
                    <NewsletterForm variant="compact" />
                </motion.div>

                {/* Sitemap Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
                >
                    {/* Brand Column */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gradient-primary">Ricardo Blog</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Web development insights, tutorials, and thoughts on modern tech stack.
                        </p>
                    </div>

                    {/* Sitemap Column */}
                    <div>
                        <h4 className="font-semibold mb-4">Sitemap</h4>
                        <ul className="space-y-2">
                            {footerLinks.sitemap.map((link) => (
                                <li key={link.href}>
                                    <MyLink
                                        href={link.href}
                                        variant="subtle"
                                        className="text-sm hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </MyLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <MyLink
                                        href={link.href}
                                        variant="subtle"
                                        isExternal={link.external}
                                        className="text-sm hover:text-primary transition-colors inline-flex items-center gap-1"
                                    >
                                        {link.label}
                                        {link.href === '/rss.xml' && <Rss className="w-3 h-3" />}
                                    </MyLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2">
                            {footerLinks.social.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <li key={link.href}>
                                        <MyLink
                                            href={link.href}
                                            variant="subtle"
                                            isExternal
                                            externalIcon={false}
                                            className="text-sm hover:text-primary transition-colors inline-flex items-center gap-2"
                                        >
                                            <Icon className="w-4 h-4" />
                                            {link.label}
                                        </MyLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="pt-8 border-t border-border/50"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            Made with
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            >
                                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            </motion.span>
                            by <span className="text-gradient-primary font-semibold">Ricardo</span>
                        </p>

                        <p className="text-xs text-muted-foreground/70">
                            © {new Date().getFullYear()} • Built with Next.js, MDX & Tailwind CSS
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}