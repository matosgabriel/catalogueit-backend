import { Router } from 'express';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

import CategoriesController from '../controllers/CategoriesController';

const categoriesController = new CategoriesController();
const categoriesRoutes = Router();

categoriesRoutes.post('/', ensureAuthenticated, categoriesController.create);
categoriesRoutes.put('/', ensureAuthenticated, categoriesController.update);

export default categoriesRoutes;
