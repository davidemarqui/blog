import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

// Prevent Next.js from prerendering this route at build time.
export const dynamic = 'force-dynamic'

interface PostData {
  title: string;
  slug: string;
  content: string;
  cover_image?: string;
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db('Posts');
  const posts = db.collection('Post');
  const docs = await posts.find().sort({ created_at: -1 }).toArray();

  const postsData = docs.map((doc: any) => ({
    id: doc._id?.toString() ?? "",
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    views: doc.views ?? 0,
    created_at: doc.created_at instanceof Date ? doc.created_at.toISOString() : String(doc.created_at ?? ""),
    cover_image: doc.cover_image ?? null
  }));

  return NextResponse.json(postsData);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, slug, content, cover_image }: PostData = await req.json();
    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('Posts');
    const posts = db.collection('Post');
    await posts.insertOne({
      title,
      slug,
      content,
      cover_image: cover_image || null,
      views: 0,
      created_at: new Date(),
    });

    return NextResponse.json({ message: 'Post created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
