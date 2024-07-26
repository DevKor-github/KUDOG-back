import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const injectLocalUser = createParamDecorator(
  (_: unknown, cts: ExecutionContext): number => {
    const request = cts.switchToHttp().getRequest();
    return request.user;
  },
);
