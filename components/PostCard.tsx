import Link from "next/link"
import { formatTimeAgo } from "@/lib/hn-time"

interface PostCardProps {
  post: {
    id: string
    title: string
    slug: string
    cover_image?: string
    created_at: string
    views: number
  }
  rank: number
  className?: string
  showCover?: boolean
}

function formatViews(n: number): string {
  return new Intl.NumberFormat().format(n)
}

export function PostCard({ post, rank, className, showCover = false }: PostCardProps) {
  const meta = `${formatViews(post.views)} hits · ${formatTimeAgo(post.created_at)}`

  return (
    <div className={className ?? ""}>
      <div className="flex items-start gap-2 text-[13px] leading-snug">
        <span className="w-7 shrink-0 text-right text-hn-meta tabular-nums pt-0.5">{rank}.</span>
        <span
          className="shrink-0 w-4 text-center text-hn-upvote select-none pt-0.5"
          title="marker"
          aria-hidden
        >
          ▶
        </span>
        <div className="min-w-0 flex-1">
          {showCover && post.cover_image ? (
            <Link
              href={`/posts/${post.slug}`}
              className="float-left mr-2 mb-1 block w-[4.5rem] shrink-0 border border-hn-line"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small thumb from CMS */}
              <img src={post.cover_image} alt="" className="h-14 w-full object-cover" />
            </Link>
          ) : null}
          <div>
            <Link
              href={`/posts/${post.slug}`}
              className="text-hn-foreground visited:text-hn-visited hover:text-hn-glow hover:underline"
            >
              {post.title}
            </Link>
          </div>
        </div>
      </div>
      <div className="pl-[3.25rem] text-[10px] text-hn-meta mt-1 font-mono">{meta}</div>
    </div>
  )
}
