import ICreateItemDTO from '../dtos/ICreateItemDTO';
import IUpdateItemDTO from '../dtos/IUpdateItemDTO';
import Item from '../infra/typeorm/entities/Item';

export default interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
  findByName(name: string): Promise<Item | null>;
  update(data: IUpdateItemDTO): Promise<Item>;
  findById(item_id: string): Promise<Item | null>;
  save(item: Item): Promise<Item>;
}
