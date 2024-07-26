import { JwtPayload, type RefreshTokenPayload } from '@/common/types/auth';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const InjectAccessUser = createParamDecorator(
  (_: unknown, cts: ExecutionContext): JwtPayload => {
    const request = cts.switchToHttp().getRequest();
    return request.user;
  },
);

export const injectLocalUser = createParamDecorator(
  (_: unknown, cts: ExecutionContext): number => {
    const request = cts.switchToHttp().getRequest();
    return request.user;
  },
);

export const InjectRefreshUser = createParamDecorator(
  (_: unknown, cts: ExecutionContext): RefreshTokenPayload => {
    const request = cts.switchToHttp().getRequest();
    return request.user;
  },
);
