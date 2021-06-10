import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import authConfig from '../../../../../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const header = request.headers.authorization;
  const { secret } = authConfig;

  if (!header) {
    throw new Error('Missing token.');
  }

  const token = header.split(' ')[1];

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid token.');
  }
}

export default ensureAuthenticated;
