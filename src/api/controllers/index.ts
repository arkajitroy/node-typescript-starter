import {
  addProducts,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductIndex,
  updateProduct,
} from './products/products.controller';

export const apiController = {
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
