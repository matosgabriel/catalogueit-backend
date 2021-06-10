import { Router } from 'express';

import itemsRoutes from '../../../../modules/items/infra/http/routes/items.routes';

const appRoutes = Router();

appRoutes.use('/items', itemsRoutes);

export default appRoutes;
