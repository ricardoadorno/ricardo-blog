import { getPostData, getAllPostSlugs, getSortedPostsData } from "@/lib/markdown";
import { MyLink } from "@/components/ui/MyLink";
import Image from "next/image";
import { Metadata } from "next";

// Generate static paths for all blog posts
export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths;
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const postData = await getPostData(params.slug);

    return {
        title: `${postData.title} | Ricardo's Blog`,
        description: postData.excerpt || `Read ${postData.title} on Ricardo's Blog`,
        openGraph: {
            title: postData.title,
            description: postData.excerpt || `Read ${postData.title}`,
            type: 'article',
            url: `https://ricardo-blog.com/blog/${params.slug}`,
            images: postData.coverImage ? [{ url: postData.coverImage }] : [],
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

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const postData = await getPostData(params.slug);
    const readingTime = calculateReadingTime(postData.content);
    const relatedPosts = getRelatedPosts(params.slug, postData.tags);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <MyLink href="/">
                        ← Back to home
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
                            <div className="aspect-video overflow-hidden rounded-lg mb-6">
                                <img
                                    src={postData.coverImage}
                                    alt={`Cover image for ${postData.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </header>

                    {/* Table of Contents - Auto-generated from h2 and h3 headers */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-8 not-prose">
                        <h2 className="text-lg font-bold mb-3 dark:text-white">Table of Contents</h2>
                        <div
                            className="text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: postData.content
                                    .match(/<h[23][^>]*>(.*?)<\/h[23]>/g)
                                    ?.map(heading => {
                                        const title = heading.replace(/<[^>]+>/g, '');
                                        const anchor = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
                                        return `<a href="#${anchor}" class="block mb-2 text-blue-600 dark:text-blue-400 hover:underline">${title}</a>`;
                                    })
                                    ?.join('') || 'No headers found'
                            }}
                        />
                    </div>

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
                                    <div className="h-40 bg-gray-100 dark:bg-gray-800 relative">
                                        {post.coverImage ? (
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                        )}
                                    </div>
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
    );
}