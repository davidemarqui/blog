'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PostActionsProps {
    slug: string;
}

export function PostActions({ slug }: PostActionsProps) {
    const router = useRouter();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            try {
                const response = await fetch(`/api/posts/${slug}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    router.refresh(); // Refresh the page to update the list
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.error}`);
                }
            } catch (error) {
                alert('An error occurred while deleting the post.');
            }
        }
    };

    return (
        <div className="flex gap-2 mt-2">
            <Link
                href={`/admin/post/${slug}`}
                className="flex-1 bg-white text-black px-2 py-1 text-xs font-mono hover:bg-zinc-200 transition-colors text-center"
            >
                Edit
            </Link>
            <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white px-2 py-1 text-xs font-mono hover:bg-red-700 transition-colors"
            >
                Delete
            </button>
        </div>
    );
}