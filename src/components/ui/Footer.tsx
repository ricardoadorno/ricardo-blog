'use client';

import { MyLink } from './MyLink';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative mt-20 border-t border-border/50 backdrop-blur-sm bg-card/30">
            {/* Top gradient decoration */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>

            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <motion.div
                        className="text-center md:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-sm text-muted-foreground mb-2 flex items-center justify-center md:justify-start gap-2">
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
                    </motion.div>

                    <motion.div
                        className="flex gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <MyLink href="twitter" variant="subtle">
                            Twitter
                        </MyLink>
                        <MyLink href="github" variant="subtle">
                            GitHub
                        </MyLink>
                        <MyLink href="linkedin" variant="subtle">
                            LinkedIn
                        </MyLink>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}