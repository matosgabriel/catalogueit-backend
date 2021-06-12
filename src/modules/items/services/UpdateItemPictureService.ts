import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  item_id: string;
  filename: string;
}

class UpdateItemPictureService {
  constructor(
    private itemsRepository: IItemsRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ item_id, filename }: IRequest): Promise<Item> {
    const item = await this.itemsRepository.findById(item_id);

    if (!item) {
      throw new Error('Did not exists an item with this id!');
    }

    if (item.picture) {
      await this.storageProvider.deleteFile(item.picture);
    }

    const newFile = await this.storageProvider.saveFile(filename);

    item.picture = newFile;

    await this.itemsRepository.save(item);

    return item;
  }
}

export default UpdateItemPictureService;
