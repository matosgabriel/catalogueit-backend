import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  category_id: string;
  name: string;
}

class UpdateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async execute(data: IRequest): Promise<Category> {
    const { category_id, name } = data;

    const categoryExists = await this.categoriesRepository.findById(
      category_id,
    );

    if (!categoryExists) {
      throw new Error('Did not exists a category with this id!');
    }

    const updatedCategory = await this.categoriesRepository.update({
      category_id,
      name,
    });

    return updatedCategory;
  }
}

export default UpdateCategoryService;
