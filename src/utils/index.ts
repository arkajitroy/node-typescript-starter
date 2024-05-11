import { generateHashedPassword } from './hashedPassword';
import { signJwt, verifyJwt } from './jwt';
import handleMultipartData, { storage } from './multerHandler';

export const utility = {
  password: {
    generateHashedPassword,
  },
  jwt: {
    signJwt,
    verifyJwt,
  },
  multer: {
    storage,
    handleMultipartData,
  },
};
