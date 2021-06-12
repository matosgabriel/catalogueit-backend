import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

import ItemsController from '../controllers/ItemsController';
import ItemsPictureController from '../controllers/ItemsPictureController';

const itemsRoutes = Router();
const itemsController = new ItemsController();
const itemsPictureController = new ItemsPictureController();
const upload = multer(uploadConfig.multer);

itemsRoutes.post('/', ensureAuthenticated, itemsController.create);
itemsRoutes.put('/', ensureAuthenticated, itemsController.update);
itemsRoutes.patch(
  '/picture',
  ensureAuthenticated,
  upload.single('picture'),
  itemsPictureController.update,
);

export default itemsRoutes;
