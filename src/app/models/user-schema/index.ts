import mongoose, { Model } from 'mongoose';
import { IUser } from '../@types';
const { Schema } = mongoose;

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
  },
  { timestamps: true },
);

const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema, 'users');

export default UserModel;
