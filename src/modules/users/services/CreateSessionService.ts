import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

import authConfig from '../../../config/auth';

interface IRequest {
  login: string;
  password: string;
}

interface ISession {
  user: User;
  token: string;
}

class CreateSessionService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(data: IRequest): Promise<ISession> {
    const { login, password } = data;

    const user = await this.usersRepository.findByLogin(login);

    if (!user) {
      throw new Error('Validation fault.');
    }

    if (!(await compare(password, user.password))) {
      throw new Error('Validation fault.');
    }

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
