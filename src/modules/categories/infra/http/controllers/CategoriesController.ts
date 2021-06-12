import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '../../../services/CreateCategoryService';
import UpdateCategoryService from '../../../services/UpdateCategoryService';

interface IQuery {
  id: string;
}

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const newCategory = await createCategory.execute({ name });

    return response.json(newCategory);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.query as unknown as IQuery;

    const updateCategory = container.resolve(UpdateCategoryService);

    const updatedCategory = await updateCategory.execute({
      category_id: id,
      name,
    });

    return response.json(updatedCategory);
  }
}

export default CategoriesController;
