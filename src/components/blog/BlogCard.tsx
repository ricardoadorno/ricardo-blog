import Link from 'next/link';
import { PostData } from '@/lib/markdown';

interface BlogCardProps {
    post: PostData;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {post.coverImage && (
                <div className="mb-4 aspect-video overflow-hidden rounded-md">
                    <img
                        src={post.coverImage}
                        alt={`Cover image for ${post.title}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="space-y-2">
                <h2 className="text-xl font-bold">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                    </Link>
                </h2>

                <div className="flex items-center text-sm text-gray-500">
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    {post.author && (
                        <>
                            <span className="mx-2">•</span>
                            <span>{post.author}</span>
                        </>
                    )}
                </div>

                <p className="text-gray-600">{post.excerpt}</p>

                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}