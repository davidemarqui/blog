import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function GET() {
  const col = await getCollection("Posts", "Post")
  const docs = await col.find().sort({ created_at: -1 }).toArray()

  const posts = docs.map((doc: any) => ({
    id: doc._id?.toString() ?? "",
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    views: doc.views ?? 0,
    created_at: doc.created_at instanceof Date ? doc.created_at.toISOString() : String(doc.created_at ?? "")
  }))

  return NextResponse.json(posts)
}
