import { MyLink } from '@/components/ui/MyLink';
import { PostData } from '@/lib/markdown';
import { OptimizedImage } from './OptimizedImage';

interface BlogCardProps {
    post: PostData;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow dark:border-gray-800 dark:bg-gray-800/50">
            {post.coverImage && (
                <div className="mb-4 aspect-video overflow-hidden rounded-md">
                    <OptimizedImage
                        src={post.coverImage}
                        alt={`Cover image for ${post.title}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="space-y-2">
                <h2 className="text-xl font-bold dark:text-white">
                    <MyLink href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                    </MyLink>
                </h2>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
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

                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{post.excerpt}</p>

                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.map((tag) => (
                            <MyLink
                                key={tag}
                                href={`/tag/${tag}`}
                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                {tag}
                            </MyLink>
                        ))}
                    </div>
                )}

                <div className="pt-2">
                    <MyLink
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 dark:text-blue-400 text-sm hover:underline inline-flex items-center"
                    >
                        Read more <span className="ml-1">→</span>
                    </MyLink>
                </div>
            </div>
        </div>
    );
}