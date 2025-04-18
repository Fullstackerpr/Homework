import jwt from 'jsonwebtoken';
import { config } from './config.js';

export const generateToken = (payload, sec) => {
  const secret = sec || config.jwtSecret;
  const options = {
    expiresIn: '1h' 
  };

  return jwt.sign(payload, secret, options);
};
