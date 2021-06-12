import { inject, injectable } from 'tsyringe';
import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
}

@injectable()
class CreateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Item> {
    const { name } = data;

    const itemExists = await this.itemsRepository.findByName(name);

    if (itemExists) {
      throw new Error('Already exists an item with this name!');
    }

    const newItem = await this.itemsRepository.create(data);

    return newItem;
  }
}

export default CreateItemService;
