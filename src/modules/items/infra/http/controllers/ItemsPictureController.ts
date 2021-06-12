import { Request, Response } from 'express';

import DiskStorageProvider from '../../../../../shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import ItemsRepository from '../../typeorm/repositories/ItemsRepository';
import UpdateItemPictureService from '../../../services/UpdateItemPictureService';

interface IQuery {
  item_id: string;
}

class ItemsPictureController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { item_id } = request.query as unknown as IQuery;
    const { filename } = request.file;

    const diskStorageProvider = new DiskStorageProvider();
    const itemsRepository = new ItemsRepository();
    const updatePicture = new UpdateItemPictureService(
      itemsRepository,
      diskStorageProvider,
    );

    const updatedItem = await updatePicture.execute({
      filename,
      item_id,
    });

    return response.json(updatedItem);
  }
}

export default ItemsPictureController;
