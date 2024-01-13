import { Request, Response } from "express";
import UserModel from "../../../model/users/Users.model";

export const duplicateUsernameCheck = async (username: string): Promise<Boolean> => {
  try {
    const usernameInstance = await UserModel.findOne({ username });
    // if a user with same username exist then return true or else false
    return usernameInstance ? true : false;
  } catch (error) {
    throw error;
  }
};

export const duplicateEmailCheck = async (email: string): Promise<Boolean> => {
  try {
    const emailInstance = await UserModel.findOne({ email });
    return emailInstance ? true : false;
  } catch (error) {
    throw error;
  }
};
