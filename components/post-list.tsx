import Link from "next/link"
import type { Post } from "@/lib/types"
import { PostCard } from "./PostCard"

function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

function formatDate(date: string): string {
  return new Date(date).getFullYear().toString()
}

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="mx-auto border-y border-zinc-700 p-3 overflow-x-auto overflow-y-hidden h-56">
      <div className="flex gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            formattedDate={formatDate(post.created_at)}
            formattedViews={`${formatNumber(post.views)} views`}
            className="w-48"
          />
        ))}
      </div>
    </div>
  )
}

