import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
}
