import jwt, { Secret } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';
import { TJwtPayload } from '../@types/others/TJWTPayload';

export const signJwt = (payload: TJwtPayload, expiry: string = '1y', secret: Secret = JWT_SECRET_KEY): string => {
  return jwt.sign(payload, secret, { expiresIn: expiry });
};

export const verifyJwt = (token: string, secret: Secret = JWT_SECRET_KEY): TJwtPayload => {
  return jwt.verify(token, secret) as TJwtPayload;
};
