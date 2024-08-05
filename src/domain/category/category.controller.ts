import { InjectUser, NamedController } from '@/common/decorators';
import { CategoryDocs } from '@/common/decorators/docs';
import { UseValidation } from '@/common/decorators/useValidation';
import { FindOneParams } from '@/common/dtos/findOneParams.dto';
import { JwtPayload } from '@/common/types/auth';
import { Body, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { UseJwtGuard } from '../auth/guards/jwt.guard';
import { CategoryService } from './category.service';
import { ProviderListResponseDto } from './dtos/ProviderListResponse.dto';
import { CategoryListResponseDto } from './dtos/categoryListResponse.dto';

@CategoryDocs
@NamedController('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseJwtGuard()
  @Get('/providers')
  async getProviders(): Promise<ProviderListResponseDto[]> {
    return this.categoryService.getProviders();
  }

  @UseJwtGuard()
  @UseValidation(['NOT_ACCEPTABLE'])
  @Get('/by-providers/:id')
  async getCategories(
    @Param() params: FindOneParams,
  ): Promise<CategoryListResponseDto[]> {
    const { id } = params;
    return this.categoryService.getCategories(id);
  }

  @UseJwtGuard()
  @Get('/providers/bookmarks')
  async getBookmarkedProviders(
    @InjectUser() user: JwtPayload,
  ): Promise<ProviderListResponseDto[]> {
    return this.categoryService.getBookmarkedProviders(user.id);
  }
}
