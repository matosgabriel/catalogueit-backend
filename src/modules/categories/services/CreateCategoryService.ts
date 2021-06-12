import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Category> {
    const { name } = data;

    const categoryExists = await this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new Error('Category with this name already exists!');
    }

    const newCategory = this.categoriesRepository.create({ name });
    return newCategory;
  }
}

export default CreateCategoryService;
