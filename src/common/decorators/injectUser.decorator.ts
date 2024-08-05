import { JwtPayload } from '@/common/types/auth';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const InjectUser = createParamDecorator(
  (_: unknown, cts: ExecutionContext): JwtPayload => {
    const request = cts.switchToHttp().getRequest();
    return request.user;
  },
);

export const InjectToken = createParamDecorator(
  (_: unknown, cts: ExecutionContext): JwtPayload => {
    const request = cts.switchToHttp().getRequest();
    return request.headers.authorization.split('Bearer ')[1];
  },
);
