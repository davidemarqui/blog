import Link from "next/link"

interface PostCardProps {
    post: {
        id: string
        title: string
        slug: string
        cover_image?: string
        created_at: string
        views: number
    }
    formattedDate: string
    formattedViews: string
    className?: string
}

export function PostCard({ post, formattedDate, formattedViews, className }: PostCardProps) {
    return (
        <Link
            href={`/posts/${post.slug}`}
            className={`flex-shrink-0 h-full border border-zinc-700 group hover:border-zinc-500 flex flex-col justify-between ${className || ''}`}
        >
            {post.cover_image && (
                <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-32 object-cover rounded-t"
                />
            )}
            <div className="p-3">
                <div className="font-medium group-hover:underline text-sm flex-1">{post.title}</div>
                <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{formattedDate}</div>
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400">{formattedViews}</div>
                </div>
            </div>
        </Link>
    )
}