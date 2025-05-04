export function Footer() {
    return (
        <footer className="border-t mt-10">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-600">
                            © {new Date().getFullYear()} Ricardo's Blog. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <a href="https://twitter.com" className="text-gray-600 hover:text-blue-500">
                            Twitter
                        </a>
                        <a href="https://github.com" className="text-gray-600 hover:text-blue-500">
                            GitHub
                        </a>
                        <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-500">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}