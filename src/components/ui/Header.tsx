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
            className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between max-w-7xl">
                <MyLink href="/" className="text-lg font-bold flex items-center gap-2 group relative z-50">
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Code2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:to-primary transition-all duration-300">
                        Ricardo
                    </span>
                </MyLink>

                <div className="flex items-center gap-6">
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-border/50 backdrop-blur-sm">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <MyLink
                                    key={item.href}
                                    href={item.href}
                                    variant="nav"
                                    className={cn(
                                        "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full hover:text-foreground/80",
                                        isActive ? "text-primary-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-primary rounded-full shadow-sm"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </MyLink>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2 pl-2 border-l border-border/50">
                        <ThemeToggle />
                        <MobileMenu items={navItems} />
                    </div>
                </div>
            </div>
        </motion.header>
    );
}