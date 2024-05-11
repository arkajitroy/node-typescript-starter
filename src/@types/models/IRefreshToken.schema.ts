import { Document } from 'mongoose';

export interface IRefreshTokenSchema extends Document {
  token: string;
}
