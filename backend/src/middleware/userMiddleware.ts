import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function UserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        msg: "Token does not exist!",
      });
    }
    const decoded = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`,
    ) as JwtPayload;
    if (!decoded || !decoded.userId) {
      return res.status(403).json({ msg: "Invalid token payload" });
    }
    const userId = decoded.userId;
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
}
