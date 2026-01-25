import { NextAuthOptions, DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { User } from '@/types/auth';

// Extend NextAuth types for custom fields
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: 'admin';
    } & DefaultSession['user'];
  }
  interface User {
    role: 'admin';
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const client = await clientPromise;
        const db = client.db('Posts');
        const user = await db.collection<User>('Users').findOne({ email: credentials.email });
        console.log("user: ",user)
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user._id.toString(), email: user.email, role: 'admin' };
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = 'admin';
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub!;
      session.user.role = 'admin';
      return session;
    },
  },
};