import { MyLink } from '@/components/ui/MyLink';
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

    // Sort tags alphabetically
    allTags.sort();

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Topics</h2>
            <div className="flex flex-wrap gap-2">
                <MyLink
                    href="/"
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${!selectedTag
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                >
                    All
                </MyLink>

                {allTags.map(tag => (
                    <MyLink
                        key={tag}
                        href={`/tag/${tag}`}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTag === tag
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                    >
                        {tag}
                    </MyLink>
                ))}
            </div>
        </div>
    );
}