import Link from 'next/link';
import { PostData } from "@/lib/markdown";

interface TagCloudProps {
    posts: PostData[];
    selectedTag?: string;
}

export function TagCloud({ posts, selectedTag }: TagCloudProps) {
    // Get all unique tags from posts
    const allTags = posts.reduce<string[]>((tags, post) => {
        if (post.tags) {
            post.tags.forEach(tag => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
        }
        return tags;
    }, []);

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Topics</h2>
            <div className="flex flex-wrap gap-2">
                <Link
                    href="/"
                    className={`px-3 py-1 rounded-full text-sm ${!selectedTag
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    All
                </Link>

                {allTags.map(tag => (
                    <Link
                        key={tag}
                        href={`/tag/${tag}`}
                        className={`px-3 py-1 rounded-full text-sm ${selectedTag === tag
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    );
}