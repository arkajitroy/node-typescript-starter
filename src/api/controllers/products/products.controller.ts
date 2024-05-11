import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductModel from '../../../models/products.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { IProduct } from '../../../@types/models/IProducts.schema';

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productInstance: IProduct = await ProductModel.findOne({ id }).select('-updatedAt -__v');

    return res.send(StatusCodes.OK).send({
      message: 'Successfully fetched product!',
      result: productInstance,
    });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).send({
      error: 'Failed to fetch the product',
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    const productFilterQuery: FilterQuery<IProduct> = {
      _id: { $in: ids },
    };

    const productsInstance: Array<IProduct> = await ProductModel.find(productFilterQuery).select('-updatedAt -__v');

    return res.send(StatusCodes.OK).send({
      message: 'Successfully fetched products!',
      result: productsInstance,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error,
    });
  }
};

export const getProductIndex = async (req: Request, res: Response) => {
  try {
    const productIndex: Array<IProduct> = await ProductModel.find().select('-updatedAt -__v').sort({ _id: 1 });

    return res.send(StatusCodes.OK).send({
      message: 'Successfully fetched product!',
      result: productIndex,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const targetProductInstance = await ProductModel.findOneAndDelete({ id });

    if (!targetProductInstance) {
      return res.status(StatusCodes.CONFLICT).send({
        message: 'Nothing to delete!',
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, size } = req.body;
    const { id } = req.params;
    const filePath = req.file?.path;

    const updateInstancePayload: UpdateQuery<IProduct> = {
      name,
      price,
      size,
      ...(req.file && {
        image: filePath,
      }),
    };

    try {
      await ProductModel.findByIdAndUpdate({ _id: id }, updateInstancePayload, { new: true });
    } catch (error) {
      return new Error();
    }
    return res.send(StatusCodes.OK).send({
      message: 'Successfully Updated the product',
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: 'Failed to update!',
    });
  }
};

export const addProducts = async (req: Request, res: Response) => {
  try {
    const { name, price, size } = req.body;
    const filePath = req.file?.path;

    const newProductPayload = {
      name,
      price,
      size,
      image: filePath,
    };

    try {
      new ProductModel(newProductPayload).save();
    } catch (error) {
      throw new Error();
    }
    return res.status(StatusCodes.CREATED).send({
      message: 'Successfully created product!',
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: 'Failed to create product!',
    });
  }
};
