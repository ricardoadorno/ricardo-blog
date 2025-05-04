export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">About This Blog</h1>

                <div className="prose lg:prose-xl">
                    <p>
                        Welcome to my personal blog! I'm Ricardo, a passionate web developer and technology enthusiast.
                        This blog is where I share my thoughts, experiences, and learnings about web development,
                        design patterns, and emerging technologies.
                    </p>

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
                        I've been working in web development for several years, focusing on creating performant,
                        accessible, and user-friendly applications. My expertise includes React, TypeScript,
                        and various frontend and backend technologies.
                    </p>

                    <h2>Contact Me</h2>
                    <p>
                        I'm always open to discussing new projects, opportunities, or just chatting about
                        technology. Feel free to reach out to me on social media or via email.
                    </p>
                </div>
            </div>
        </div>
    );
}