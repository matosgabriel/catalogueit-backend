import { Router } from 'express';

import itemsRoutes from '../../../../modules/items/infra/http/routes/items.routes';
import usersRoutes from '../../../../modules/users/infra/http/routes/users.routes';

const appRoutes = Router();

appRoutes.use('/items', itemsRoutes);
appRoutes.use('/users', usersRoutes);

export default appRoutes;
