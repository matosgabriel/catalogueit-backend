import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  item_id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
}

@injectable()
class UpdateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Item> {
    const { item_id } = data;
    const isUuid = validate(item_id);

    if (!isUuid) {
      throw new Error('Invalid id!');
    }

    const item = await this.itemsRepository.findById(item_id);

    if (!item) {
      throw new Error('Not found an item with this id!');
    }

    const updatedItem = await this.itemsRepository.update(data);

    return updatedItem;
  }
}

export default UpdateItemService;
