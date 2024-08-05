import { PageQuery } from '@/common/dtos/pageQuery';
import {
  ExecutionContext,
  NotAcceptableException,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const UsePagination = createParamDecorator(
  (_: unknown, cts: ExecutionContext): PageQuery => {
    const request: Request = cts.switchToHttp().getRequest();
    if (
      typeof request.query.page !== 'string' ||
      typeof request.query.pageSize !== 'string'
    )
      throw new NotAcceptableException('Invalid page query');
    const page = Number.parseInt(request.query.page, 10);
    const pageSize = Number.parseInt(request.query.pageSize, 10);

    if (
      Number.isNaN(page) ||
      Number.isNaN(pageSize) ||
      page < 1 ||
      pageSize < 1
    )
      throw new NotAcceptableException('Invalid page query');

    return {
      page,
      pageSize,
    };
  },
);
