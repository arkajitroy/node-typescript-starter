import UserModel from '@/models/users.model';

export const duplicateUsernameCheck = async (username: string): Promise<boolean> => {
  const usernameInstance = await UserModel.findOne({ username });
  // if a user with same username exist then return true or else false
  return usernameInstance ? true : false;
};

export const duplicateEmailCheck = async (email: string): Promise<boolean> => {
  const emailInstance = await UserModel.findOne({ email });
  return emailInstance ? true : false;
};
