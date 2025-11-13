import { MyLink } from '@/components/ui/MyLink';
import { PostMeta } from '@/lib/mdx';
import { OptimizedImage } from './OptimizedImage';

interface BlogCardProps {
    post: PostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <div className="group card-gradient-border hover:scale-[1.02] transition-all duration-300">
            <div className="card-gradient-border-content">
                {post.coverImage && (
                    <div className="mb-4 aspect-video overflow-hidden rounded-lg relative">
                        <OptimizedImage
                            src={post.coverImage}
                            alt={`Cover image for ${post.title}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                )}

                <div className="space-y-3">
                    <h2 className="text-xl font-bold">
                        <MyLink
                            href={`/blog/${post.slug}`}
                            className="hover:text-gradient-primary transition-all duration-300"
                        >
                            {post.title}
                        </MyLink>
                    </h2>

                    <div className="flex items-center text-sm text-muted-foreground">
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

                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">{post.excerpt}</p>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {post.tags.map((tag) => (
                                <MyLink
                                    key={tag}
                                    href={`/tag/${tag}`}
                                    className="px-3 py-1 text-xs glass rounded-full hover:glow-purple transition-all duration-300"
                                >
                                    {tag}
                                </MyLink>
                            ))}
                        </div>
                    )}

                    <div className="pt-2">
                        <MyLink
                            href={`/blog/${post.slug}`}
                            className="text-primary text-sm inline-flex items-center gap-2 group/link"
                        >
                            <span className="text-gradient-tech">Read more</span>
                            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                        </MyLink>
                    </div>
                </div>
            </div>
        </div>
    );
}