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

function formatNumber(num: number): string {
    return new Intl.NumberFormat().format(num);
}

function formatDate(date: string): string {
    return new Date(date).getFullYear().toString();
}

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login');
    }

    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-black text-white p-6">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mx-auto w-full">
                            {posts.map((post) => (
                                <div key={post.id}>
                                    <PostCard
                                        post={post}
                                        formattedDate={formatDate(post.created_at)}
                                        formattedViews={`${formatNumber(post.views)} views`}
                                    />
                                    <PostActions slug={post.slug} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-zinc-400">No posts yet. Create your first post!</p>
                    )}
                </div>
            </div>
        </div>
    );
}