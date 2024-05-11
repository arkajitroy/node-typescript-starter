import { Router } from 'express';
import { apiController } from '../../api/controllers';
import { isAuthenticated, validate } from '../../middlewares/authenticate';
import handleMultipartData from '../../utils/multerHandler';

// initial/constants
const { getAllProducts, getProduct, getProductIndex, deleteProduct, addProducts, updateProduct } =
  apiController.products;

export const ProductRoutes = Router();

// Product Routes
ProductRoutes.post('/products/cart-items', getAllProducts);
ProductRoutes.post('/products', [isAuthenticated, validate], handleMultipartData, addProducts);
ProductRoutes.put('/products/:id', [isAuthenticated, validate], handleMultipartData, updateProduct);
ProductRoutes.delete('/products/:id', [isAuthenticated, validate], deleteProduct);
ProductRoutes.get('/products', getProductIndex);
ProductRoutes.get('/products/:id', getProduct);
