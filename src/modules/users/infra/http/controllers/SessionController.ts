import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import CreateSessionService from '../../../services/CreateSessionService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const usersRepository = new UsersRepository();
    const createSession = new CreateSessionService(usersRepository);

    const { user, token } = await createSession.execute({ login, password });

    return response.json({ user: classToClass(user), token });
  }
}

export default SessionController;
