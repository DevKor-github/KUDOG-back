import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { RefreshTokenPayload } from 'src/interfaces/auth';

export const InjectRefreshUser = createParamDecorator(
  (_: unknown, cts: ExecutionContext): RefreshTokenPayload => {
    const request = cts.switchToHttp().getRequest();
    return request.user;
  },
);
