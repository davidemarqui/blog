import { notFound } from "next/navigation"
import clientPromise from "@/lib/mongodb"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import { CoverMedia } from "@/components/CoverMedia"
import { Metadata } from "next"
import { PostCard } from "@/components/PostCard"
import { formatTimeAgo } from "@/lib/hn-time"

// Types for our post data
type Post = {
  id: string
  title: string
  content: string
  views: number
  created_at: string
  slug: string
  cover_image?: string
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const yearsAgo = now.getFullYear() - date.getFullYear()
  return `${formattedDate} (${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago)`
}

async function getPost(slug: string): Promise<Post | null> {
  const client = await clientPromise
  const db = client.db("Posts")
  const col = db.collection("Post")
  const doc = await col.findOne({ slug })
  if (!doc) return null

  try {
    await col.updateOne({ _id: doc._id }, { $inc: { views: 1 } })
  } catch {
    // ignore update errors
  }

  return {
    id: doc._id?.toString() ?? "",
    title: doc.title,
    content: doc.content,
    views: (doc.views ?? 0) + 1,
    created_at: doc.created_at instanceof Date ? doc.created_at.toISOString() : String(doc.created_at ?? ""),
    slug: doc.slug,
    cover_image: doc.cover_image ?? "",
  }
}

async function getSimilarPosts(slug: string, limit = 3): Promise<Post[]> {
  const client = await clientPromise
  const db = client.db("Posts")
  const col = db.collection("Post")
  const current = await col.findOne({ slug })
  if (!current) return []

  const mapDoc = (doc: any): Post => ({
    id: doc._id?.toString() ?? "",
    title: doc.title,
    content: doc.content ?? "",
    views: doc.views ?? 0,
    created_at: doc.created_at instanceof Date ? doc.created_at.toISOString() : String(doc.created_at ?? ""),
    slug: doc.slug,
    cover_image: doc.cover_image ?? "",
  })

  if (Array.isArray(current.tags) && current.tags.length) {
    const docs = await col
      .find({ slug: { $ne: slug }, tags: { $in: current.tags } })
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray()
    if (docs.length) return docs.map(mapDoc)
  }

  const title = String(current.title ?? "")
  const words = title.split(/\s+/).filter(Boolean).slice(0, 3)
  if (words.length) {
    const regex = words.map((w) => `(?=.*${w.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`).join("")
    try {
      const docs = await col
        .find({ slug: { $ne: slug }, title: { $regex: regex, $options: "i" } })
        .sort({ created_at: -1 })
        .limit(limit)
        .toArray()
      if (docs.length) return docs.map(mapDoc)
    } catch {
      // ignore
    }
  }

  const docs = await col.find({ slug: { $ne: slug } }).sort({ created_at: -1 }).limit(limit).toArray()
  return docs.map(mapDoc)
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    }
  }

  return {
    title: post.title,
    description: `Notes by David — ${post.title}`,
    openGraph: {
      title: post.title,
      description: `Notes by David — ${post.title}`,
      type: "article",
      authors: ["David"],
    },
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const similar = await getSimilarPosts(params.slug)

  return (
    <article className="border-b border-hn-line bg-hn-bg/50">
      <div className="px-3 sm:px-4 pt-3 pb-3 border-b border-hn-line/70 bg-hn-panel/40">
        <p className="m-0 mb-1.5 text-[10px] uppercase tracking-[0.12em] text-hn-meta font-mono">
          read · markdown
        </p>
        <h1 className="text-xl sm:text-2xl font-normal m-0 text-hn-glow hack-glow leading-snug tracking-tight">
          {post.title}
        </h1>
        <p className="m-0 mt-2 text-[11px] text-hn-meta font-mono tabular-nums">{formatViewsLine(post)}</p>
      </div>
      {post.cover_image ? <CoverMedia url={post.cover_image} title={post.title} /> : null}
      <div className="px-3 sm:px-4 py-6 sm:py-8">
        <MarkdownRenderer content={post.content} />
      </div>
      <section className="px-0 pb-3 border-t border-hn-line">
        <h2 className="m-0 px-3 py-1.5 text-[11px] text-hn-meta font-mono uppercase tracking-wide">more</h2>
        {similar.length > 0 ? (
          <ol className="list-none m-0 p-0 divide-y divide-hn-line/50">
            {similar.map((p, i) => (
              <li key={p.id} className="list-none">
                <PostCard post={p} rank={i + 1} className="px-3 py-2.5 hover:bg-hn-panel/30 transition-colors" />
              </li>
            ))}
          </ol>
        ) : (
          <p className="px-3 py-2 text-sm text-hn-meta">none</p>
        )}
      </section>
    </article>
  )
}

function formatViewsLine(post: Post): string {
  return `${post.views.toLocaleString()} hits · ${formatTimeAgo(post.created_at)} · ${formatDate(post.created_at)}`
}
