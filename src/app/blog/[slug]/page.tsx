import { getPostData, getRelatedPosts, getAllPostSlugs, getAdjacentPosts } from "@/lib/mdx";
import { extractHeadings, calculateReadingTime as calcReadingTime } from "@/lib/toc";
import { MyLink } from "@/components/ui/MyLink";
import { Metadata } from "next";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbsSchema } from "@/components/seo/BreadcrumbsSchema";
import { OptimizedImage } from "@/components/blog/OptimizedImage";
import { BlogCard3D } from "@/components/blog/BlogCard3D";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ScrollProgress } from "@/components/blog/ScrollProgress";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { ReadingTime } from "@/components/blog/ReadingTime";
import { PostNavigation } from "@/components/blog/PostNavigation";
import { SkipLink } from "@/components/ui/SkipLink";
import fs from 'fs';
import path from 'path';

// Generate static paths for all blog posts
export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const postData = await getPostData(slug);

    // Read raw content for reading time and headings
    let fullPath = path.join(process.cwd(), 'src/content/posts', `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(process.cwd(), 'src/content/posts', `${slug}.md`);
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const contentWithoutFrontmatter = fileContents.split('---').slice(2).join('---');

    const readingTime = calcReadingTime(contentWithoutFrontmatter);
    const headings = extractHeadings(contentWithoutFrontmatter);
    const relatedPosts = getRelatedPosts(slug, postData.tags, postData.category);
    const { prev, next } = getAdjacentPosts(slug);

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

            {/* Scroll progress indicator */}
            <ScrollProgress />

            <main id="main-content" className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    {/* Visual Breadcrumbs */}
                    <Breadcrumbs />

                    <article className="prose lg:prose-xl max-w-none dark:prose-invert prose-headings:scroll-mt-20">
                        <header className="mb-12 not-prose">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground leading-tight">
                                {postData.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-base text-muted-foreground mb-6">
                                <time dateTime={postData.date} className="font-medium">
                                    {new Date(postData.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                                {postData.author && (
                                    <>
                                        <span className="hidden sm:inline text-muted-foreground/50">•</span>
                                        <span className="font-medium">{postData.author}</span>
                                    </>
                                )}
                                <span className="hidden sm:inline text-muted-foreground/50">•</span>
                                <ReadingTime minutes={readingTime} />
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

                        {/* Render MDX content */}
                        <div className="mdx-content">
                            {postData.content}
                        </div>

                        {postData.tags && postData.tags.length > 0 && (
                            <div className="mt-10 pt-6 border-t border-border/50 not-prose">
                                <h2 className="text-lg font-bold mb-4 text-foreground">Tags</h2>
                                <div className="flex flex-wrap gap-3">
                                    {postData.tags.map((tag) => (
                                        <MyLink
                                            key={tag}
                                            href={`/tag/${tag}`}
                                            className="group inline-flex items-center px-4 py-2 rounded-lg bg-primary/5 border border-primary/10 text-foreground hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                                        >
                                            <span className="text-primary mr-1.5 font-medium">#</span>
                                            {tag}
                                        </MyLink>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Previous/Next Post Navigation */}
                    <PostNavigation prev={prev} next={next} />

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-16 pt-10 border-t border-border/50">
                            <h2 className="text-3xl font-bold mb-8 text-foreground">
                                <span className="text-gradient-primary">Related Posts</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map(post => (
                                    <BlogCard3D key={post.slug} post={post} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}