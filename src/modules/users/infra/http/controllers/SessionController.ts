import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '../../../services/CreateSessionService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const createSession = container.resolve(CreateSessionService);

    const { user, token } = await createSession.execute({ login, password });

    return response.json({ user: classToClass(user), token });
  }
}

export default SessionController;
