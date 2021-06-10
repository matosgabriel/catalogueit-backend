import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();
const usersRoutes = Router();

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update);

export default usersRoutes;
