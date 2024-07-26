import { RefreshTokenPayload } from '@/common/types/auth';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const InjectRefreshUser = createParamDecorator(
  (_: unknown, cts: ExecutionContext): RefreshTokenPayload => {
    const request = cts.switchToHttp().getRequest();
    return request.user;
  },
);
