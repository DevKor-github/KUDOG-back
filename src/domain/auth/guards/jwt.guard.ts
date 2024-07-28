import { ApiKudogExceptionResponse } from '@/common/decorators';
import type { JwtPayload } from '@/common/types/auth';
import { throwKudogException } from '@/common/utils/exception';
import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import type { Request } from 'express';
import type { Observable } from 'rxjs';

@Injectable()
class JwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    if (user?.id && user?.name) return true;
    throwKudogException('LOGIN_REQUIRED');
  }
}

export function UseJwtGuard() {
  return applyDecorators(
    UseGuards(JwtGuard),
    ApiKudogExceptionResponse(['LOGIN_REQUIRED']),
  );
}
