import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Me | Ricardo’s Blog",
    description: "Learn more about Ricardo, a web developer and technology enthusiast sharing insights on web development, design patterns, and emerging technologies."
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
                        ← Back to home
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">About Me</h1>

                    <div className="flex flex-col md:flex-row gap-10 mb-10">
                        <div className="md:w-1/3 flex justify-center">
                            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                                {/* Replace with your profile image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                                    R
                                </div>
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <div className="prose dark:prose-invert">
                                <p className="text-lg leading-relaxed dark:text-gray-300">
                                    Hi there! I’m Ricardo, a passionate web developer and technology enthusiast.
                                    I specialize in building modern web applications with a focus on performance,
                                    accessibility, and user experience.
                                </p>
                                <p className="text-lg leading-relaxed dark:text-gray-300">
                                    This blog is my digital garden where I share my thoughts, experiences, and learnings
                                    about web development, design patterns, and emerging technologies.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="prose lg:prose-xl max-w-none dark:prose-invert">
                        <h2>The Tech Stack</h2>
                        <p>
                            This blog is built with modern web technologies:
                        </p>
                        <ul>
                            <li><strong>Next.js 15</strong> - For server-side rendering and static site generation</li>
                            <li><strong>Tailwind CSS</strong> - For utility-first styling</li>
                            <li><strong>shadcn/ui</strong> - For beautiful, accessible UI components</li>
                            <li><strong>Markdown</strong> - For content management</li>
                        </ul>

                        <h2>My Background</h2>
                        <p>
                            I’ve been working in web development for several years, focusing on creating performant,
                            accessible, and user-friendly applications. My expertise includes React, TypeScript,
                            and various frontend and backend technologies.
                        </p>

                        <h2>Projects</h2>
                        <p>
                            Throughout my career, I’ve worked on a variety of projects, from e-commerce platforms
                            to content management systems and data visualization tools. I’m particularly interested
                            in projects that leverage modern web technologies to solve real-world problems.
                        </p>

                        <h2>Contact Me</h2>
                        <p>
                            I’m always open to discussing new projects, opportunities, or just chatting about
                            technology. Feel free to reach out to me on social media or via email.
                        </p>
                    </div>

                    <div className="mt-10 pt-8 border-t dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-4 dark:text-white">Let’s Connect</h3>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://twitter.com" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">Twitter</a>
                            <a href="https://github.com" className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-md transition-colors">GitHub</a>
                            <a href="https://linkedin.com" className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-md transition-colors">LinkedIn</a>
                            <a href="mailto:contact@example.com" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">Email</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}