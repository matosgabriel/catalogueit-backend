import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  login: string;
  new_password: string;
  old_password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const { id, old_password, login, name, new_password } = data;

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('Did not exists an user with this id!');
    }

    if (!(await compare(old_password, user.password))) {
      throw new Error('Authorization failed, check your credentials.');
    }

    if (login !== user.login) {
      const checkLoginUsed = await this.usersRepository.findByLogin(login);

      if (checkLoginUsed) {
        throw new Error('Login already in use, try one else.');
      }
    }

    const hashedPassword = await hash(new_password, 8);

    const updatedUser = await this.usersRepository.update({
      id,
      name,
      login,
      new_password: hashedPassword,
    });

    return updatedUser;
  }
}

export default UpdateUserService;
