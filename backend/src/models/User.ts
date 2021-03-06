import mongoose, { Schema, Document } from 'mongoose';

export interface UserInfo {
  username: string;
  isAdmin: boolean;
  id: string;
}

export interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
  _id: string;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IUser>('User', userSchema);
