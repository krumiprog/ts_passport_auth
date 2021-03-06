import { CastError } from 'mongoose';
import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User, { IUser, UserInfo } from '../models/User';

export const initializePassport = () => {
  const authenticateUser = async (
    username: string,
    password: string,
    done: (arg0: null, arg1: boolean | IUser) => void
  ) => {
    User.findOne({ username }, (err: CastError, user: IUser) => {
      if (err) throw err;
      if (!user) return done(null, false);

      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  };

  passport.use(new Strategy(authenticateUser));
  passport.serializeUser((user: IUser, done) => done(null, user.id));
  passport.deserializeUser((id: string, done) => {
    User.findOne({ _id: id }, (err: CastError, user: IUser) => {
      const userInformation: UserInfo = {
        username: user.username,
        isAdmin: user.isAdmin,
        id: user._id,
      };
      done(err, userInformation);
    });
  });
};
