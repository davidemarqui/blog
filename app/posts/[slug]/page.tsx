import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Image from "next/image";
import { Metadata } from "next";
import { PostCard } from "@/components/PostCard";

// Types for our post data
type Post = {
  id: string;
  title: string;
  content: string;
  views: number;
  created_at: string;
  slug: string;
  cover_image?: string;
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
  const client = await clientPromise;
  const db = client.db('Posts');
  const col = db.collection('Post');
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
    cover_image: doc.cover_image ?? "",
  }
}

// Fetch similar posts for the given slug. Tries tags, then title words, then recent posts.
async function getSimilarPosts(slug: string, limit = 3): Promise<Post[]> {
  const client = await clientPromise;
  const db = client.db('Posts');
  const col = db.collection('Post');
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
    cover_image: doc.cover_image ?? "",
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
    <article className="prose prose-zinc dark:prose-invert max-w-none py-5 border-b border-zinc-700">
      <h1 className="text-2xl mb-0 px-5">{post.title}</h1>
      <div className="my-2 grid grid-cols-2 w-full px-5">
        <span className="text-xs text-zinc-500">
          {formatDate(post.created_at)}
        </span>
        <span className="text-xs text-zinc-500 text-right">
          {post.views.toLocaleString()} views
        </span>
      </div>
      {post.cover_image ? (
        <Image
          src={post.cover_image}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full h-auto my-4 border-y border-zinc-700"
        />
      ) : null}
      <div className="px-5">
        <MarkdownRenderer content={post.content} />
      </div>
      <section className="mt-5 px-5 border-t border-zinc-700">
        <h2 className="text-lg my-4">Similar posts</h2>
        {similar.length > 0 ? (
          <div className="overflow-x-auto overflow-y-hidden h-full">
            <div className="flex gap-4">
              {similar.map((p) => (
                <PostCard
                  key={p.id}
                  post={p}
                  formattedDate={formatDate(p.created_at)}
                  formattedViews={`${p.views.toLocaleString()} views`}
                  className="w-48"
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-zinc-500">No similar posts found.</p>
        )}
      </section>
    </article>
  );
}