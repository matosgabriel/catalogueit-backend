import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateItemPictureService from '../../../services/UpdateItemPictureService';

interface IQuery {
  id: string;
}

class ItemsPictureController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.query as unknown as IQuery;
    const { filename } = request.file;

    const updatePicture = container.resolve(UpdateItemPictureService);

    const updatedItem = await updatePicture.execute({
      filename,
      item_id: id,
    });

    return response.json(updatedItem);
  }
}

export default ItemsPictureController;
