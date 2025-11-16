'use client';

import { MyLink } from './MyLink';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export function Header() {
    return (
        <motion.header
            className="sticky top-0 z-50 glass-header backdrop-blur-xl border-b border-border/50 shadow-lg"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        >
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <div className="container mx-auto px-4 py-4">
                <nav className="flex justify-between items-center">
                    <MyLink href="/" className="text-xl font-bold flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                        >
                            <Code2 className="w-6 h-6 text-primary" />
                        </motion.div>
                        <span className="text-gradient-primary">Ricardo Blog</span>
                    </MyLink>
                    <div className="flex items-center gap-8">
                        <motion.ul
                            className="flex gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <li>
                                <MyLink href="/" variant="nav">
                                    Home
                                </MyLink>
                            </li>
                            <li>
                                <MyLink href="/about" variant="nav">
                                    About
                                </MyLink>
                            </li>
                            <li>
                                <MyLink href="/blog" variant="nav">
                                    Blog
                                </MyLink>
                            </li>
                        </motion.ul>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            <ThemeToggle />
                        </motion.div>
                    </div>
                </nav>
            </div>
        </motion.header>
    );
}