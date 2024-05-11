import { TObjectId } from '../others/TObjectId';

export interface IUserSchema {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IUser extends IUserSchema, TObjectId {}
