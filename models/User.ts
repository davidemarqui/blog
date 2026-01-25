import mongoose, { Schema, model, models } from 'mongoose';
import { User } from '@/types/auth';

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
});

export default models.User || model<User>('User', UserSchema);