import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateItemService from '../../../services/CreateItemService';
import UpdateItemService from '../../../services/UpdateItemService';
import ItemsRepository from '../../typeorm/repositories/ItemsRepository';

interface IQuery {
  id: string;
}

class ItemsController {
  public async create(request: Request, response: Response) {
    const { name, description, price, category_id } = request.body;
    const createItem = container.resolve(CreateItemService);

    const newItem = await createItem.execute({
      name,
      description,
      price,
      category_id,
    });

    return response.json(newItem);
  }

  public async update(request: Request, response: Response) {
    const itemsRepository = new ItemsRepository();
    const { id } = request.query as unknown as IQuery;

    const { name, description, price, category_id } = request.body;

    const updateItem = new UpdateItemService(itemsRepository);

    const updatedItem = await updateItem.execute({
      item_id: id,
      name,
      description,
      price,
      category_id,
    });

    return response.json(classToClass(updatedItem));
  }
}

export default ItemsController;
