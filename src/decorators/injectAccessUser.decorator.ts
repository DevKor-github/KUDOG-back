import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload } from 'src/interfaces/auth';

export const InjectAccessUser = createParamDecorator(
  (_: unknown, cts: ExecutionContext): JwtPayload => {
    const request = cts.switchToHttp().getRequest();
    return request.user;
  },
);
