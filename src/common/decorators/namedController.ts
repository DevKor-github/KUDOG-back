import { Controller, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function NamedController(name: string) {
  return applyDecorators(ApiTags(name), Controller(name));
}
