import mongoose, { Model } from 'mongoose';
import { IRefreshTokenSchema } from '../@types/models/IRefreshToken.schema';

const { Schema } = mongoose;

const refreshTokenSchema = new Schema<IRefreshTokenSchema>(
  {
    token: { type: String, unique: true },
  },
  { timestamps: false },
);

const RefreshTokenModel: Model<IRefreshTokenSchema> = mongoose.model<IRefreshTokenSchema>(
  'RefreshToken',
  refreshTokenSchema,
);

export default RefreshTokenModel;
