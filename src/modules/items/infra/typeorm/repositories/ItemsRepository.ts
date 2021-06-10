import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateItemDTO from '../../../dtos/ICreateItemDTO';
import IUpdateItemDTO from '../../../dtos/IUpdateItemDTO';
import IItemsRepository from '../../../repositories/IItemsRepository';

import Item from '../entities/Item';

@EntityRepository(Item)
class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async create(data: ICreateItemDTO): Promise<Item> {
    const newItem = this.ormRepository.create(data);
    await this.ormRepository.save(newItem);

    return newItem;
  }

  public async findByName(name: string): Promise<Item[] | null> {
    const findItems = await this.ormRepository.find({ where: { name } });

    return findItems;
  }

  public async update(data: IUpdateItemDTO): Promise<Item> {
    const { item_id, name, description, price } = data;
    const updated = await this.ormRepository.save({
      id: item_id,
      name,
      description,
      price,
    });

    return updated;
  }

  public async findById(item_id: string): Promise<Item | null> {
    const item = await this.ormRepository.findOne({ where: { id: item_id } });

    return item || null;
  }
}

export default ItemsRepository;
