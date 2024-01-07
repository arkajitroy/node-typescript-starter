import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  mobile?: number;
  address?: string;
  profile?: string;
}
