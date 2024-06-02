import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config()

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || 'your_jwt_secret',
    (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido.' });
      }

      (req as any).user = user;
      next();
    }
  );
};