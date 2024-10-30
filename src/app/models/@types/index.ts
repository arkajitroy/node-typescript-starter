import { Document } from 'mongoose';

export { IUser };

//? =========== USER SCHEMA =============
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}
