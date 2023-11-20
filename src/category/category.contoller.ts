import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { CategoryReponseDto } from './dtos/categoryResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { DocumentedException } from 'src/interfaces/docsException';
import { CategoryRequestDto } from './dtos/categoryRequest.dto';

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

  @UseGuards(AuthGuard('jwt-access'))
  @Put('subscribe')
  @ApiOperation({
    summary: 'subscribe/unsubscribe category',
    description:
      '카테고리를 구독/구독취소합니다. Authorization Header에 Bearer ${accessToken}을 넣어주세요.',
  })
  @ApiOkResponse({ description: '카테고리 구독/구독취소 성공' })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 invalid',
    type: DocumentedException,
  })
  @ApiBadRequestResponse({
    description: 'invalid category id',
    type: DocumentedException,
  })
  async subscribeCategories(@Body() body: CategoryRequestDto, @Req() req: any) {
    await this.categoryService.subscribeCategories(
      req.user.id,
      body.subscribeIds,
    );
    await this.categoryService.deleteCategories(
      req.user.id,
      body.unsubscribeIds,
    );
  }
}
