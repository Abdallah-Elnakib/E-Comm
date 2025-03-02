import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.session?.refreshToken;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};