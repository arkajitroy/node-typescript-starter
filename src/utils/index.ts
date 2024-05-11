import { generateHashedPassword } from './hashedPassword';
import { signJwt, verifyJwt } from './jwt';

export const utility = {
  password: {
    generateHashedPassword,
  },
  jwt: {
    signJwt,
    verifyJwt,
  },
};
