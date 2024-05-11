import { TUser } from '../models/IUsers.schema';

export type TUserOmitPassword = Omit<TUser, 'password'>;
