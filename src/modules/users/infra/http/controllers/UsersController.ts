import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import CreateUsersService from '../../../services/CreateUserService';
import UpdateUserService from '../../../services/UpdateUserService';

class UsersController {
  public async create(request: Request, response: Response) {
    const { name, login, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUser = new CreateUsersService(usersRepository);

    const user = await createUser.execute({ name, login, password });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response) {
    const { name, login, new_password, old_password } = request.body;
    const { id } = request.user;

    const usersRepository = new UsersRepository();
    const updateUser = new UpdateUserService(usersRepository);

    const user = await updateUser.execute({
      id,
      name,
      login,
      new_password,
      old_password,
    });

    return response.json(classToClass(user));
  }
}

export default UsersController;
