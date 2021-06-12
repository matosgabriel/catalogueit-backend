import { Request, Response } from 'express';

import CreateItemService from '../../../services/CreateItemService';
import UpdateItemService from '../../../services/UpdateItemService';
import ItemsRepository from '../../typeorm/repositories/ItemsRepository';

class ItemsController {
  public async create(request: Request, response: Response) {
    const itemsRepository = new ItemsRepository();
    const { name, description, price } = request.body;
    const createItem = new CreateItemService(itemsRepository);

    const newItem = await createItem.execute({
      name,
      description,
      price,
    });

    return response.json(newItem);
  }

  public async update(request: Request, response: Response) {
    const itemsRepository = new ItemsRepository();

    const { item_id, name, description, price } = request.body;

    const updateItem = new UpdateItemService(itemsRepository);

    const updatedItem = await updateItem.execute({
      item_id,
      name,
      description,
      price,
    });

    return response.json(updatedItem);
  }
}

export default ItemsController;
