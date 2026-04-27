import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { PostCard } from '@/components/PostCard';
import type { Post } from '@/lib/types';
import { PostActions } from './PostActions';

export const dynamic = 'force-dynamic';

async function getPosts(): Promise<Post[]> {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/posts`);
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
}

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login');
    }

    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-hn-bg text-hn-foreground p-6 font-mono">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold font-mono">Dashboard</h1>
                    <Link
                        href="/admin/post"
                        className="bg-white text-black py-2 px-4 hover:bg-zinc-200 transition-colors font-mono"
                    >
                        Create New Post
                    </Link>
                </div>
                <div>
                    <h2 className="text-xl font-mono mb-4">Your Posts</h2>
                    {posts.length > 0 ? (
                        <ol className="list-none m-0 p-0 space-y-1 border border-hn-line rounded bg-hn-panel max-w-2xl">
                            {posts.map((post, i) => (
                                <li key={post.id} className="list-none border-b border-hn-line last:border-b-0">
                                    <PostCard post={post} rank={i + 1} className="px-2 py-1.5" />
                                    <div className="px-2 pb-2">
                                        <PostActions slug={post.slug} />
                                    </div>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="text-zinc-400">No posts yet. Create your first post!</p>
                    )}
                </div>
            </div>
        </div>
    );
}