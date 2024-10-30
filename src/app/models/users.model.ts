import mongoose, { Model } from 'mongoose';
import { IUserSchema } from '../@types/models/IUsers.schema';

const { Schema } = mongoose;

const userSchema = new Schema<IUserSchema>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
  },
  { timestamps: true },
);

const UserModel: Model<IUserSchema> = mongoose.model<IUserSchema>('User', userSchema, 'users');

export default UserModel;
