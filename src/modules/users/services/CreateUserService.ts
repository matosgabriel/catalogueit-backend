import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  login: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(data: IRequest): Promise<User> {
    const { name, login, password } = data;

    const loginInUse = await this.usersRepository.findByLogin(login);

    if (loginInUse) {
      throw new Error('Login already in use, try one else!');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      login,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
