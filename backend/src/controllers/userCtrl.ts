import { Request, Response, NextFunction, response } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import { CastError } from 'mongoose';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req?.body;

  if (!username || !password) {
    res.send('Username and password is required');
    return;
  }

  User.findOne({ username }, async (err: CastError, existentUser: IUser) => {
    if (err) throw Error(`Error while Registering new user :  ${err}`);

    if (!existentUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: 'User has been registered' });
    } else {
      res.status(400).json({
        message: 'User already exist',
      });
    }
  });
};

export const loginUser = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login' });
};

export const logoutUser = (req: Request, res: Response) => {
  req.logOut();
  res.status(200).json({ message: 'Logout' });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req?.body;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Delete' });
  } catch (err) {
    res.status(400).json({ message: `Can not delete by id: ${id}` });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  await User.find({}, (err: CastError, users: IUser[]) => {
    if (err) throw err;
    res.status(200).json(users);
  });
};
