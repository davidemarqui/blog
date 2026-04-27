import type { Post } from "@/lib/types"
import { PostCard } from "./PostCard"

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="border-t border-hn-line px-3 py-4 text-sm text-hn-meta">No posts yet.</div>
    )
  }

  return (
    <ol className="m-0 list-none divide-y divide-hn-line/50 border-t border-hn-line p-0">
      {posts.map((post, i) => (
        <li key={post.id} className="list-none">
          <PostCard post={post} rank={i + 1} className="px-3 py-2 hover:bg-hn-bg/50" />
        </li>
      ))}
    </ol>
  )
}
