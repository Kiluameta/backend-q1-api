import jwt from 'jsonwebtoken';
require('dotenv').config()

export const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '1h',
  });
};