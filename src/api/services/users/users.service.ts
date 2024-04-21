import { TUserOmitPassword } from '../../../@types/api/IUser';
import { TUser } from '../../../@types/models/TUsers.schema';
import UserModel from '../../../models/users.model';

export const getUserInstanceByUsername = async (username: string): Promise<TUserOmitPassword | null> => {
  const userInstance: TUser | null = await UserModel.findOne({ username });

  if (!userInstance) return null;

  // Destructure the user object to extract password
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...otherData } = userInstance;

  // Return otherData without the password
  return otherData;
};
