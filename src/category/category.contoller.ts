import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CategoryReponseDto } from './dtos/categoryResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { DocumentedException } from 'src/interfaces/docsException';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('by-provider/:id')
  @ApiOperation({
    description:
      'provider id로 해당 category 가져오기 Authorization Header에 Bearer ${accessToken}을 넣어주세요.',
    summary: 'get category list by provider id',
  })
  @ApiParam({
    name: 'id',
    description: 'provider id',
    required: true,
    type: Number,
    example: 1,
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 invalid',
    type: DocumentedException,
  })
  @ApiNotFoundResponse({
    description: 'provider가 존재하지 않습니다.',
    type: DocumentedException,
  })
  @ApiOkResponse({
    description: 'category 반환 ',
    type: CategoryReponseDto,
  })
  async getcategories(@Param('id') providerId: number) {
    return await this.categoryService.getcategories(providerId);
  }
}
