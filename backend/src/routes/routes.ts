import { Router } from 'express';
import passport from 'passport';
import {
  deleteUser,
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/userCtrl';
import { checkCredentials } from '../middlewares/checkCredentials';

const routes = Router();

routes.post('/register', registerUser);
routes.post('/login', passport.authenticate('local'), loginUser);
routes.get('/logout', logoutUser);
routes.delete('/delete', checkCredentials, deleteUser);
routes.get('/users', checkCredentials, getAllUsers);

export default routes;
