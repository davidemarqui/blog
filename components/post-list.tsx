import Link from "next/link"
import type { Post } from "@/lib/types"

function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

function formatDate(date: string): string {
  return new Date(date).getFullYear().toString()
}

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="mx-auto border border-zinc-500 p-4">
      <div className="grid grid-cols-12 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <div className="col-span-2">Date</div>
        <div className="col-span-8">Title</div>
        <div className="col-span-2 text-right">Views</div>
      </div>
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.slug}`}
          className="grid grid-cols-12 group py-2 -mx-4 px-4 rounded-lg"
        >
          <div className="col-span-2 text-gray-500 dark:text-gray-400 font-mono">{formatDate(post.created_at)}</div>
          <div className="col-span-8 font-medium group-hover:underline">{post.title}</div>
          <div className="col-span-2 text-right font-mono text-gray-500 dark:text-gray-400">
            {formatNumber(post.views)}
          </div>
        </Link>
      ))}
    </div>
  )
}

