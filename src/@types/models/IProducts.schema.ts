import { TObjectId } from '../others/TObjectId';

export interface IProductSchema {
  name: string;
  price: number;
  size: string;
  image: string;
}

export interface IProduct extends IProductSchema, TObjectId {}
