import { MyLink } from './MyLink';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
    return (
        <header className="sticky top-0 z-50 glass-header backdrop-blur-xl border-b border-border/50">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex justify-between items-center">
                    <MyLink href="/" className="text-xl font-bold text-gradient-primary hover:scale-105 transition-transform">
                        Ricardo Blog
                    </MyLink>
                    <div className="flex items-center gap-6">
                        <ul className="flex gap-6">
                            <li>
                                <MyLink
                                    href="/"
                                    variant="nav"
                                    className="hover:text-primary transition-colors relative group"
                                >
                                    Home
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
                                </MyLink>
                            </li>
                            <li>
                                <MyLink
                                    href="/about"
                                    variant="nav"
                                    className="hover:text-primary transition-colors relative group"
                                >
                                    About
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
                                </MyLink>
                            </li>
                            <li>
                                <MyLink
                                    href="/blog"
                                    variant="nav"
                                    className="hover:text-primary transition-colors relative group"
                                >
                                    Blog
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
                                </MyLink>
                            </li>
                        </ul>
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </header>
    );
}