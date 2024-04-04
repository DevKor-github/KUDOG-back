import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //TODO: 카테고리 맵 추가 / 필요없는 것삭제.
  /*
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
    type: [CategoryReponseDto],
  })
  async getcategories(@Param('id') providerId: number) {
    return await this.categoryService.getcategories(providerId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('subscribe')
  @ApiOperation({
    summary: 'get subscribed category list',
    description:
      '구독한 카테고리 목록을 가져옵니다. Authorization Header에 Bearer ${accessToken}을 넣어주세요.',
  })
  @ApiOkResponse({
    description: '구독한 카테고리 목록 반환',
    type: [CategoryReponseDto],
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 invalid',
    type: DocumentedException,
  })
  async getSubscribedCategories(
    @Req() req: any,
  ): Promise<CategoryReponseDto[]> {
    const { id } = req.user;
    return await this.categoryService.getSubscribedCategories(id);
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
  @ApiConflictResponse({
    description: '구독 목록에 이미 구독되어있는 카테고리 Id 존재',
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
  */
}
