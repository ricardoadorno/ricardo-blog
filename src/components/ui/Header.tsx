import Link from 'next/link';

export function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold">
                        Ricardo's Blog
                    </Link>
                    <ul className="flex gap-6">
                        <li>
                            <Link href="/" className="hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-blue-600 transition-colors">
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}