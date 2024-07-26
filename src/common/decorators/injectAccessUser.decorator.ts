import { JwtPayload } from '@/common/types/auth';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const InjectAccessUser = createParamDecorator(
  (_: unknown, cts: ExecutionContext): JwtPayload => {
    const request = cts.switchToHttp().getRequest();
    return request.user;
  },
);
