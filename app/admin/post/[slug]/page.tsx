'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPostPage() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const postSlug = params.slug as string;

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${postSlug}`);
                if (response.ok) {
                    const post = await response.json();
                    setTitle(post.title);
                    setSlug(post.slug);
                    setContent(post.content);
                    setCoverImage(post.cover_image || '');
                } else {
                    alert('Post not found');
                    router.push('/admin');
                }
            } catch (error) {
                alert('Error loading post');
                router.push('/admin');
            } finally {
                setIsLoading(false);
            }
        };

        if (postSlug) {
            fetchPost();
        }
    }, [postSlug, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/posts/${postSlug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    slug,
                    content,
                    cover_image: coverImage || undefined,
                }),
            });

            if (response.ok) {
                router.push('/admin');
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            alert('An error occurred while updating the post.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
                <div className="text-xl font-mono">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold font-mono mb-6">Edit Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-mono mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                            className="w-full bg-zinc-800 border border-zinc-700 p-3 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                            placeholder="Enter post title"
                        />
                    </div>
                    <div>
                        <label htmlFor="slug" className="block text-sm font-mono mb-2">Slug</label>
                        <input
                            type="text"
                            id="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            required
                            className="w-full bg-zinc-800 border border-zinc-700 p-3 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                            placeholder="post-slug"
                        />
                    </div>
                    <div>
                        <label htmlFor="coverImage" className="block text-sm font-mono mb-2">Cover Image URL</label>
                        <input
                            type="url"
                            id="coverImage"
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 p-3 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-mono mb-2">Content (Markdown)</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={20}
                            className="w-full bg-zinc-800 border border-zinc-700 p-3 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 font-mono"
                            placeholder="Write your post content in Markdown..."
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-white text-black py-3 px-6 hover:bg-zinc-200 transition-colors font-mono disabled:opacity-50"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Post'}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/admin')}
                            className="bg-zinc-700 text-white py-3 px-6 hover:bg-zinc-600 transition-colors font-mono"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}