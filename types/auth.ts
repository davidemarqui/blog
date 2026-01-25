// types/auth.ts
export interface User {
  _id: string;
  email: string;
  password: string; // Hashed
  role: 'admin';
}

export interface SessionUser extends User {
  id: string; // NextAuth expects 'id'
}