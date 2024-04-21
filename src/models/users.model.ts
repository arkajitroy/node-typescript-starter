import mongoose, { Schema, Model } from 'mongoose';
import { IUserSchema } from '../@types/models/TUsers.schema';

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a unique username'],
    unique: [true, 'Username already exists'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Please provide a unique email'],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});

const UserModel: Model<IUserSchema> = mongoose.model<IUserSchema>('User', UserSchema);

export default UserModel;
