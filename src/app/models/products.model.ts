import mongoose, { Model } from 'mongoose';
import { LOCAL_APP_URL } from '../config/config';
import { IProductSchema } from '../@types/models/IProducts.schema';

const Schema = mongoose.Schema;

const productSchema = new Schema<IProductSchema>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    image: {
      type: String,
      required: true,
      get: (image: string) => {
        if (process.env.ON_HEROKU == 'true') {
          return `${image}`;
        }
        return `${LOCAL_APP_URL}/${image}`;
      },
    },
  },
  { timestamps: true, toJSON: { getters: true }, id: false },
);

const ProductModel: Model<IProductSchema> = mongoose.model<IProductSchema>('Product', productSchema);

export default ProductModel;
