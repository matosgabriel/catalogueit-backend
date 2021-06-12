import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import IItemsRepository from '../../modules/items/repositories/IItemsRepository';
import ItemsRepository from '../../modules/items/infra/typeorm/repositories/ItemsRepository';

import ICategoriesRepository from '../../modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '../../modules/categories/infra/typeorm/repositories/CategoriesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  ItemsRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
