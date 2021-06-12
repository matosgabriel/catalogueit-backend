import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import IUpdateCategoryDTO from '../dtos/IUpdateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  update(data: IUpdateCategoryDTO): Promise<Category>;
  findById(id: string): Promise<Category | null>;
}
