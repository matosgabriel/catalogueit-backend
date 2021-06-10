import { Router } from 'express';

import ItemsController from '../controllers/ItemsController';

const itemsRoutes = Router();
const itemsController = new ItemsController();

itemsRoutes.post('/', itemsController.create);
itemsRoutes.put('/', itemsController.update);

export default itemsRoutes;
