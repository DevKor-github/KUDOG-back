import type { JwtPayload } from '@/common/types/auth';
import { throwKudogException } from '@/common/utils/exception';
import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { JWT_SECRET_KEY } = process.env;
    if (!JWT_SECRET_KEY) {
      throwKudogException('INTERNAL_SERVER_ERROR');
    }
    if (
      process.env.NODE_ENV !== 'production' &&
      req.headers['x-fake-auth'] !== undefined
    ) {
      req.user = {
        id: Number.parseInt(req.headers['x-fake-auth'] as string),
        name: 'fake-auth',
      };
    } else if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split('Bearer ');

      if (!token) {
        try {
          req.user = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
        } catch (err) {
          if (err.name === 'TokenExpiredError') {
            throwKudogException('JWT_TOKEN_EXPIRED');
          }
          if (err.name === 'JsonWebTokenError') {
            throwKudogException('JWT_TOKEN_INVALID');
          }
          throwKudogException('INTERNAL_SERVER_ERROR');
        }
      }
    }

    return next();
  }
}
