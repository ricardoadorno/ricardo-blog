import { MyLink } from './MyLink';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
    return (
        <header className="border-b dark:border-gray-800">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex justify-between items-center">
                    <MyLink href="/" className="text-xl font-bold dark:text-white">
                        Ricardo's Blog
                    </MyLink>
                    <div className="flex items-center gap-6">
                        <ul className="flex gap-6">
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
                        </ul>
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </header>
    );
}