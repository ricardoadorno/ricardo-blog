'use client';

import { MyLink } from './MyLink';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/blog', label: 'Blog' },
    ];

    return (
        <motion.header
            className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="container mx-auto px-6 py-3">
                <nav className="flex justify-between items-center max-w-7xl mx-auto">
                    <MyLink href="/" className="text-lg font-bold flex items-center gap-2 group">
                        <Code2 className="w-5 h-5 text-primary" />
                        <span>Ricardo</span>
                    </MyLink>
                    <div className="flex items-center gap-6">
                        {/* Desktop Navigation */}
                        <ul className="hidden lg:flex gap-8">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <MyLink
                                        href={item.href}
                                        variant="nav"
                                        className={cn(
                                            "text-sm font-medium transition-colors",
                                            pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </MyLink>
                                </li>
                            ))}
                        </ul>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Mobile Menu */}
                        <MobileMenu items={navItems} />
                    </div>
                </nav>
            </div>
        </motion.header>
    );
}