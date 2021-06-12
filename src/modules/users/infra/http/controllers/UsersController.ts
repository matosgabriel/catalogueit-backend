import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUsersService from '../../../services/CreateUserService';
import UpdateUserService from '../../../services/UpdateUserService';

class UsersController {
  public async create(request: Request, response: Response) {
    const { name, login, password } = request.body;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({ name, login, password });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response) {
    const { name, login, new_password, old_password } = request.body;
    const { id } = request.user;

    const updateUser = container.resolve(UpdateUserService);

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
