import { getRepository, Repository } from 'typeorm';
import ICreateCategoryDTO from '../../../dtos/ICreateCategoryDTO';
import IUpdateCategoryDTO from '../../../dtos/IUpdateCategoryDTO';
import ICategoriesRepository from '../../../repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const { name } = data;

    const category = this.ormRepository.create({ name });

    await this.ormRepository.save(category);

    return category;
  }

  public async findByName(name: string): Promise<Category | null> {
    const category = await this.ormRepository.findOne({ where: { name } });

    return category || null;
  }

  public async update(data: IUpdateCategoryDTO): Promise<Category> {
    const { category_id, name } = data;

    const updatedCategory = await this.ormRepository.save({
      id: category_id,
      name,
      updated_at: new Date(),
    });

    return updatedCategory;
  }

  public async findById(id: string): Promise<Category | null> {
    const category = await this.ormRepository.findOne({ where: { id } });

    return category || null;
  }
}

export default CategoriesRepository;
