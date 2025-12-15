import { notFound } from "next/navigation";
import { getCollection } from "@/lib/mongodb";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Link from "next/link";
import { Metadata } from "next";

// Types for our post data
type Post = {
  id: string;
  title: string;
  content: string;
  views: number;
  created_at: string;
  slug: string;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  
  // Format to "Month Day, Year"
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Calculate years since the date
  const yearsAgo = now.getFullYear() - date.getFullYear();
  return `${formattedDate} (${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago)`;
}

async function getPost(slug: string): Promise<Post | null> {
  const col = await getCollection("Posts", "Post")
  const doc = await col.findOne({ slug })
  if (!doc) return null

  // increment views
  try {
    await col.updateOne({ _id: doc._id }, { $inc: { views: 1 } })
  } catch (e) {
    // ignore update errors
  }

  return {
    id: doc._id?.toString() ?? "",
    title: doc.title,
    content: doc.content,
    views: (doc.views ?? 0) + 1,
    created_at: doc.created_at instanceof Date ? doc.created_at.toISOString() : String(doc.created_at ?? ""),
    slug: doc.slug,
  }
}

// Fetch similar posts for the given slug. Tries tags, then title words, then recent posts.
async function getSimilarPosts(slug: string, limit = 3): Promise<Post[]> {
  const col = await getCollection("Posts", "Post")
  const current = await col.findOne({ slug })
  if (!current) return []

  // Helper to map raw docs to Post
  const mapDoc = (doc: any): Post => ({
    id: doc._id?.toString() ?? "",
    title: doc.title,
    content: doc.content ?? "",
    views: doc.views ?? 0,
    created_at: doc.created_at instanceof Date ? doc.created_at.toISOString() : String(doc.created_at ?? ""),
    slug: doc.slug,
  })

  // Try matching tags
  if (Array.isArray(current.tags) && current.tags.length) {
    const docs = await col
      .find({ slug: { $ne: slug }, tags: { $in: current.tags } })
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray()
    if (docs.length) return docs.map(mapDoc)
  }

  // Try matching title words (first up to 3 words)
  const title = String(current.title ?? "")
  const words = title.split(/\s+/).filter(Boolean).slice(0, 3)
  if (words.length) {
    // build a regex that matches posts containing these words (loose match)
    const regex = words.map(w => `(?=.*${w.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`).join('')
    try {
      const docs = await col
        .find({ slug: { $ne: slug }, title: { $regex: regex, $options: 'i' } })
        .sort({ created_at: -1 })
        .limit(limit)
        .toArray()
      if (docs.length) return docs.map(mapDoc)
    } catch (e) {
      // ignore regex errors and fallthrough to recent
    }
  }

  // Fallback: recent posts excluding current
  const docs = await col.find({ slug: { $ne: slug } }).sort({ created_at: -1 }).limit(limit).toArray()
  return docs.map(mapDoc)
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    };
  }

  return {
    title: post.title,
    description: `Read ${post.title} by DaviDemarqui`,
    openGraph: {
      title: post.title,
      description: `Read ${post.title} by DaviDemarqui`,
      type: 'article',
      authors: ['DaviDemarqui'],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const similar = await getSimilarPosts(params.slug);

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none pt-5 pb-20">
      <h1 className="text-2xl mb-0">{post.title}</h1>
      <div className="my-5 grid grid-cols-2 w-full">
        <span className="text-xs text-zinc-500">
          @DaviDemarqui | {formatDate(post.created_at)}
        </span>
        <span className="text-xs text-zinc-500 text-right">
          {post.views.toLocaleString()} views
        </span>
      </div>
      <MarkdownRenderer content={post.content} />
      <section className="mt-12 border-t border-zinc-500">
        <h2 className="text-lg mb-4">Similar posts</h2>
        {similar.length > 0 ? (
          <ul className="space-y-3">
            {similar.map((p) => (
              <li key={p.id}>
                <Link href={`/posts/${p.slug}`} className="text-sm font-medium text-blue-600 hover:underline">
                  {p.title}
                </Link>
                <div className="text-xs text-zinc-500">{formatDate(p.created_at)} • {p.views.toLocaleString()} views</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">No similar posts found.</p>
        )}
      </section>
    </article>
  );
}