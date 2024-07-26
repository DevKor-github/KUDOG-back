import { InjectAccessUser, NamedController } from '@/common/decorators';
import { CategoryDocs } from '@/common/decorators/docs/category.decorator';
import { JwtPayload } from '@/common/types/auth';
import { Get, Param } from '@nestjs/common';
import { IntValidationPipe } from 'src/pipes/intValidation.pipe';
import { JwtAccessGuard } from '../auth/passport/accessToken.strategy';
import { CategoryService } from './category.service';
import { ProviderListResponseDto } from './dtos/ProviderListResponse.dto';
import { CategoryListResponseDto } from './dtos/categoryListResponse.dto';

@CategoryDocs
@NamedController('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @JwtAccessGuard()
  @Get('/providers')
  async getProviders(): Promise<ProviderListResponseDto[]> {
    return this.categoryService.getProviders();
  }

  @JwtAccessGuard()
  @Get('/by-providers/:id')
  async getCategories(
    @Param('id', IntValidationPipe) id: number,
  ): Promise<CategoryListResponseDto[]> {
    return this.categoryService.getCategories(id);
  }

  @JwtAccessGuard()
  @Get('/providers/bookmarks')
  async getBookmarkedProviders(
    @InjectAccessUser() user: JwtPayload,
  ): Promise<ProviderListResponseDto[]> {
    return this.categoryService.getBookmarkedProviders(user.id);
  }
}
