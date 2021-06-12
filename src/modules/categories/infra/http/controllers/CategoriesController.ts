import { Request, Response } from 'express';

import CreateCategoryService from '../../../services/CreateCategoryService';
import UpdateCategoryService from '../../../services/UpdateCategoryService';
import CategoriesRepository from '../../typeorm/repositories/CategoriesRepository';

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const categoriesRepository = new CategoriesRepository();
    const createCategory = new CreateCategoryService(categoriesRepository);

    const newCategory = await createCategory.execute({ name });

    return response.json(newCategory);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { category_id, name } = request.body;

    const categoriesRepository = new CategoriesRepository();
    const updateCategory = new UpdateCategoryService(categoriesRepository);

    const updatedCategory = await updateCategory.execute({ category_id, name });

    return response.json(updatedCategory);
  }
}

export default CategoriesController;
