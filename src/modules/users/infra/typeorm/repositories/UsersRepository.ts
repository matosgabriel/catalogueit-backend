import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../../../dtos/IUpdateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const { name, login, password } = data;

    const user = this.ormRepository.create({ name, login, password });
    const savedUser = await this.ormRepository.save(user);

    return savedUser;
  }

  public async update(data: IUpdateUserDTO): Promise<User> {
    const { id, name, login, new_password } = data;

    const user = await this.ormRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('Internal server error.');
    }

    Object.assign(user, {
      name,
      login,
      password: new_password,
      updated_at: new Date(),
    });

    const updatedUser = await this.ormRepository.save(user);

    return updatedUser;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user || null;
  }

  public async findByLogin(login: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({ where: { login } });

    return user || null;
  }
}

export default UsersRepository;
