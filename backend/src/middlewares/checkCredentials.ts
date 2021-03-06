import { Request, Response, NextFunction } from 'express';
import { CastError } from 'mongoose';
import User, { IUser } from '../models/User';

export const checkCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user }: any = req;
  if (user) {
    User.findOne({ username: user.username }, (err: CastError, doc: IUser) => {
      if (err) throw err;
      if (doc?.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden' });
      }
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
