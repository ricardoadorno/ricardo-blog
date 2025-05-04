import { MyLink } from './MyLink';

export function Footer() {
    return (
        <footer className="border-t mt-10 dark:border-gray-800">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            © {new Date().getFullYear()} Ricardo’s Blog. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <MyLink href="twitter" variant="subtle">
                            Twitter
                        </MyLink>
                        <MyLink href="github" variant="subtle">
                            GitHub
                        </MyLink>
                        <MyLink href="linkedin" variant="subtle">
                            LinkedIn
                        </MyLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}