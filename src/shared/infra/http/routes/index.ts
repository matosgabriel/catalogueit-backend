import { Router } from 'express';

import itemsRoutes from '../../../../modules/items/infra/http/routes/items.routes';
import usersRoutes from '../../../../modules/users/infra/http/routes/users.routes';
import sessionRoutes from '../../../../modules/users/infra/http/routes/session.routes';
import categoriesRoutes from '../../../../modules/categories/infra/http/routes/categories.routes';

const appRoutes = Router();

appRoutes.use('/items', itemsRoutes);
appRoutes.use('/users', usersRoutes);
appRoutes.use('/session', sessionRoutes);
appRoutes.use('/categories', categoriesRoutes);

export default appRoutes;
