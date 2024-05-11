import {
  addProducts,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductIndex,
  updateProduct,
} from './products/products.controller';
import { getProfile } from './users/users.controller';

export const apiController = {
  user: { getProfile },
  auth: {},
  products: {
    getProduct,
    getAllProducts,
    getProductIndex,
    deleteProduct,
    addProducts,
    updateProduct,
  },
};
