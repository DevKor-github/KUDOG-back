import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { PageQuery } from 'src/interfaces/pageQuery';

export const UsePage = createParamDecorator(
  (_: unknown, cts: ExecutionContext): PageQuery => {
    const request = cts.switchToHttp().getRequest();
    if (!request.query.page) {
      request.query.page = 1;
    }
    if (!request.query.pageSize) {
      request.query.pageSize = 10;
    }
    return { page: request.query.page, pageSize: request.query.pageSize };
  },
);
