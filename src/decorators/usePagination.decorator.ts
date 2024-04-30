import {
  ExecutionContext,
  NotAcceptableException,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';
import { PageQuery } from 'src/interfaces/pageQuery';

export const UsePagination = createParamDecorator(
  (_: unknown, cts: ExecutionContext): PageQuery => {
    const request: Request = cts.switchToHttp().getRequest();
    if (
      typeof request.query.page !== 'string' ||
      typeof request.query.pageSize !== 'string'
    )
      throw new NotAcceptableException('Invalid page query');
    const page = parseInt(request.query.page, 10);
    const pageSize = parseInt(request.query.pageSize, 10);

    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1)
      throw new NotAcceptableException('Invalid page query');

    return {
      page,
      pageSize,
    };
  },
);
