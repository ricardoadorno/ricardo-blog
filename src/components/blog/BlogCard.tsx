import { MyLink } from '@/components/ui/MyLink';
import { PostMeta } from '@/lib/mdx';
import { OptimizedImage } from './OptimizedImage';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
    post: PostMeta;
    featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
    return (
        <article
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border/50",
                "bg-card/30 backdrop-blur-sm transition-all duration-300",
                "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10",
                "hover:-translate-y-1",
                featured && "md:col-span-2 lg:col-span-3"
            )}
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className={cn("relative", featured ? "md:flex md:gap-6" : "")}>
                {/* Cover Image */}
                {post.coverImage && (
                    <div
                        className={cn(
                            "relative overflow-hidden bg-muted/30",
                            featured
                                ? "md:w-1/2 aspect-[16/10] md:aspect-auto"
                                : "aspect-video"
                        )}
                    >
                        <OptimizedImage
                            src={post.coverImage}
                            alt={`Cover image for ${post.title}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Category badge */}
                        {post.category && (
                            <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground shadow-lg">
                                    {post.category}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className={cn("p-6 space-y-4", featured && "md:w-1/2 md:flex md:flex-col md:justify-center")}>
                    {/* Title */}
                    <h2 className={cn(
                        "font-bold leading-tight",
                        featured ? "text-2xl md:text-3xl" : "text-xl"
                    )}>
                        <MyLink
                            href={`/blog/${post.slug}`}
                            className="text-foreground hover:text-primary transition-colors duration-200"
                        >
                            {post.title}
                        </MyLink>
                    </h2>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <time dateTime={post.date} className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </time>
                        {post.author && (
                            <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4" />
                                {post.author}
                            </span>
                        )}
                    </div>

                    {/* Excerpt */}
                    <p className={cn(
                        "text-muted-foreground leading-relaxed",
                        featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"
                    )}>
                        {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                                <MyLink
                                    key={tag}
                                    href={`/tag/${tag}`}
                                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                >
                                    #{tag}
                                </MyLink>
                            ))}
                            {post.tags.length > 3 && (
                                <span className="inline-flex items-center px-2.5 py-1 text-xs text-muted-foreground">
                                    +{post.tags.length - 3} more
                                </span>
                            )}
                        </div>
                    )}

                    {/* Read More Link */}
                    <div className="pt-2">
                        <MyLink
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-200 group/link"
                        >
                            <span>Read article</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </MyLink>
                    </div>
                </div>
            </div>
        </article>
    );
}
