import { getPostData, getSortedPostsData } from "@/lib/markdown";
import { MyLink } from "@/components/ui/MyLink";
import { Metadata } from "next";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbsSchema } from "@/components/seo/BreadcrumbsSchema";
import { OptimizedImage } from "@/components/blog/OptimizedImage";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { SkipLink } from "@/components/ui/SkipLink";
import fs from 'fs';
import path from 'path';

// Generate static paths for all blog posts
export async function generateStaticParams() {
    // Get all post slugs from markdown files
    const fileNames = fs.readdirSync(path.join(process.cwd(), 'src/content/posts'));

    // Create the appropriate params object for each slug
    return fileNames.map((fileName) => {
        return {
            slug: fileName.replace(/\.md$/, ''),
        };
    });
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    // Await the params before using them
    const { slug } = await params;

    const postData = await getPostData(slug);
    const baseUrl = "https://ricardo-blog.com";

    return {
        title: `${postData.title} | Ricardo's Blog`,
        description: postData.excerpt || `Read ${postData.title} on Ricardo's Blog`,
        openGraph: {
            title: postData.title,
            description: postData.excerpt || `Read ${postData.title}`,
            type: 'article',
            publishedTime: postData.date,
            modifiedTime: postData.date,
            authors: ['Ricardo'],
            url: `${baseUrl}/blog/${slug}`,
            images: [
                {
                    url: postData.coverImage ? `${baseUrl}${postData.coverImage}` : `${baseUrl}/default-og.jpg`,
                    width: 1200,
                    height: 630,
                    alt: postData.title,
                },
            ],
            siteName: 'Ricardo\'s Blog',
        },
        twitter: {
            card: 'summary_large_image',
            title: postData.title,
            description: postData.excerpt || `Read ${postData.title}`,
            creator: '@ricardohandle',
            images: [postData.coverImage ? `${baseUrl}${postData.coverImage}` : `${baseUrl}/default-og.jpg`],
        },
    };
}

// Calculate reading time
function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

// Get related posts based on tags
function getRelatedPosts(currentSlug: string, currentTags: string[] = []) {
    if (!currentTags.length) return [];

    const allPosts = getSortedPostsData();

    // Filter out current post and find posts with matching tags
    return allPosts
        .filter(post => post.slug !== currentSlug && post.tags?.some(tag => currentTags.includes(tag)))
        .slice(0, 3); // Get top 3 related posts
}

// Extract headings from content for table of contents
function extractHeadings(content: string) {
    const headingRegex = /<h([2-3])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        headings.push({
            level: parseInt(match[1], 10),
            id: match[2],
            text: match[3].replace(/<[^>]+>/g, ''),
        });
    }

    return headings;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const fileNames = fs.readdirSync(path.join(process.cwd(), 'src/content/posts'));
    console.log('gen', fileNames);


    const postData = await getPostData(slug);
    const readingTime = calculateReadingTime(postData.content);
    const relatedPosts = getRelatedPosts(slug, postData.tags);
    const headings = extractHeadings(postData.content);

    // Prepare breadcrumbs data
    const breadcrumbs = [
        { name: 'Home', url: 'https://ricardo-blog.com' },
        { name: 'Blog', url: 'https://ricardo-blog.com/blog' },
        { name: postData.title, url: `https://ricardo-blog.com/blog/${slug}` }
    ];

    return (
        <>
            {/* Add structured data for SEO */}
            <ArticleSchema post={postData} />
            <BreadcrumbsSchema items={breadcrumbs} />

            {/* Add accessibility skip link */}
            <SkipLink />

            <main id="main-content" className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <MyLink href="/blog" className="inline-flex items-center hover:text-primary transition-colors">
                            ← Back to blog
                        </MyLink>
                    </div>

                    <article className="prose lg:prose-xl max-w-none dark:prose-invert prose-headings:scroll-mt-20">
                        <header className="mb-8 not-prose">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">{postData.title}</h1>

                            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                                <time dateTime={postData.date}>
                                    {new Date(postData.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                                {postData.author && (
                                    <>
                                        <span className="mx-2">•</span>
                                        <span>{postData.author}</span>
                                    </>
                                )}
                                <span className="mx-2">•</span>
                                <span>{readingTime} min read</span>
                            </div>

                            {postData.coverImage && (
                                <OptimizedImage
                                    src={postData.coverImage}
                                    alt={`Cover image for ${postData.title}`}
                                    priority={true}
                                    className="mb-6"
                                />
                            )}
                        </header>

                        {/* Enhanced Table of Contents */}
                        {headings.length > 0 && (
                            <TableOfContents headings={headings} />
                        )}

                        <div dangerouslySetInnerHTML={{ __html: postData.content }} />

                        {postData.tags && postData.tags.length > 0 && (
                            <div className="mt-8 pt-4 border-t dark:border-gray-800 not-prose">
                                <h2 className="text-lg font-bold mb-3 dark:text-white">Tags:</h2>
                                <div className="flex flex-wrap gap-2">
                                    {postData.tags.map((tag) => (
                                        <MyLink
                                            key={tag}
                                            href={`/tag/${tag}`}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            {tag}
                                        </MyLink>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-12 pt-8 border-t dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-6 dark:text-white">Related Posts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map(post => (
                                    <div key={post.slug} className="border dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        {post.coverImage ? (
                                            <OptimizedImage
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="h-40"
                                            />
                                        ) : (
                                            <div className="w-full h-40 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                        )}
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold mb-2 dark:text-white">
                                                <MyLink href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                                                    {post.title}
                                                </MyLink>
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}