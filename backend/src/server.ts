require('dotenv').config();
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

import { connectDB } from './config/db';
import { initializePassport } from './config/passport-config';
import routes from './routes/routes';

connectDB();
initializePassport();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
