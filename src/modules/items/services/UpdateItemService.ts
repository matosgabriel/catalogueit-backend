import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  item_id: string;
  name: string;
  description: string;
  price: number;
}

class UpdateItemService {
  constructor(private itemsRepository: IItemsRepository) {}

  public async execute(data: IRequest): Promise<Item> {
    const { item_id } = data;
    const item = await this.itemsRepository.findById(item_id);

    if (!item) {
      throw new Error('Not found an item with this id!');
    }

    const updatedItem = await this.itemsRepository.update(data);

    return updatedItem;
  }
}

export default UpdateItemService;
