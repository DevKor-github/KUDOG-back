import { type Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import type { JwtPayload } from '@/common/types/auth';
import { AuthMiddleware } from './auth.middleware';

describe('authMiddleware', () => {
  const authMiddleware = new AuthMiddleware();
  process.env.JWT_SECRET_KEY = 'secret';

  it('use fake-auth header not in prod', async () => {
    const mockRequest = {
      headers: {
        'x-fake-auth': '123',
      },
      user: {
        id: 0,
      },
    };

    const mockNext = jest.fn();
    process.env.NODE_ENV = 'dev';
    await authMiddleware.use(
      mockRequest as unknown as Request,
      {} as Response,
      mockNext,
    );
    expect(mockRequest.user.id).toEqual(123);
  });

  it('not use fake-auth in production', async () => {
    const mockRequest = {
      headers: {
        'x-fake-auth': '123',
      },
      user: {
        id: 0,
      },
    };

    const mockNext = jest.fn();
    process.env.NODE_ENV = 'production';
    await authMiddleware.use(
      mockRequest as unknown as Request,
      {} as Response,
      mockNext,
    );

    expect(mockRequest.user.id).toEqual(0);
  });

  it('expired token must throw JWT EXPIRED', async () => {
    const { JWT_SECRET_KEY } = process.env;
    const payload: JwtPayload = {
      id: 1,
      name: 'test',
    };
    const options = { expiresIn: -200 };
    const token = jwt.sign(payload, JWT_SECRET_KEY, options);
    const mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const mockNext = jest.fn();

    process.env.NODE_ENV = 'production';

    try {
      await authMiddleware.use(
        mockRequest as unknown as Request,
        {} as Response,
        mockNext,
      );
    } catch (err) {
      expect(err.message).toEqual('JWT_TOKEN_EXPIRED');
    }
  });
});
