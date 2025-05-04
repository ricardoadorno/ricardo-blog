import { getPostData, getAllPostSlugs } from "@/lib/markdown";
import Link from "next/link";

// Generate static paths for all blog posts
export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const postData = await getPostData(params.slug);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-blue-600 hover:underline">
                        ← Back to home
                    </Link>
                </div>

                <article className="prose lg:prose-xl max-w-none">
                    <header className="mb-8 not-prose">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{postData.title}</h1>

                        <div className="flex items-center text-gray-500 mb-4">
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

                    <div dangerouslySetInnerHTML={{ __html: postData.content }} />

                    {postData.tags && postData.tags.length > 0 && (
                        <div className="mt-8 pt-4 border-t not-prose">
                            <h2 className="text-lg font-bold mb-3">Tags:</h2>
                            <div className="flex flex-wrap gap-2">
                                {postData.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </main>
    );
}