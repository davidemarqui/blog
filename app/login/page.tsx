'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn('credentials', { email, password, callbackUrl: '/admin' });
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="w-full max-w-md border border-zinc-700 p-6">
                <h1 className="text-xl font-bold font-mono mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="bg-black border border-zinc-700 p-3 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="bg-black border border-zinc-700 p-3 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                    />
                    <button
                        type="submit"
                        className="bg-white text-black py-3 px-4 hover:bg-zinc-200 transition-colors font-mono"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
