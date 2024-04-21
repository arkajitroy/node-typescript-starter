import { TUser } from '../models/TUsers.schema';

export type TUserOmitPassword = Omit<TUser, 'password'>;
