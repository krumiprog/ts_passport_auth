import mongoose, { ConnectOptions, CastError } from 'mongoose';

const connectOptions: ConnectOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoURI: string = process.env.MONGODB_URI as string;

export const connectDB = async () => {
  mongoose.connect(mongoURI, connectOptions, (err: CastError) => {
    if (err) throw err;
    console.error('MongoDB connected');
  });
};
