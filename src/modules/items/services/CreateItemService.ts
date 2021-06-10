import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
}

class CreateItemService {
  constructor(private itemsRepository: IItemsRepository) {}

  public async execute(data: IRequest): Promise<Item> {
    const newItem = await this.itemsRepository.create(data);

    return newItem;
  }
}

export default CreateItemService;
