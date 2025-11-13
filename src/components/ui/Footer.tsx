import { MyLink } from './MyLink';

export function Footer() {
    return (
        <footer className="relative mt-20 border-t border-border/50 backdrop-blur-sm">
            {/* Gradient decoration */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-primary opacity-50"></div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground mb-2">
                            © {new Date().getFullYear()} <span className="text-gradient-primary font-semibold">Ricardo&apos;s Blog</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Built with Next.js, MDX & Tailwind CSS
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <MyLink
                            href="twitter"
                            variant="subtle"
                            className="hover:text-primary transition-colors hover:scale-110 transform duration-200"
                        >
                            Twitter
                        </MyLink>
                        <MyLink
                            href="github"
                            variant="subtle"
                            className="hover:text-primary transition-colors hover:scale-110 transform duration-200"
                        >
                            GitHub
                        </MyLink>
                        <MyLink
                            href="linkedin"
                            variant="subtle"
                            className="hover:text-primary transition-colors hover:scale-110 transform duration-200"
                        >
                            LinkedIn
                        </MyLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}