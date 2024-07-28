import { InjectUser, NamedController } from '@/common/decorators';
import { CategoryDocs } from '@/common/decorators/docs/category.decorator';
import { JwtPayload } from '@/common/types/auth';
import { IntValidationPipe } from '@/pipes/intValidation.pipe';
import { Get, Param } from '@nestjs/common';
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
  @Get('/by-providers/:id')
  async getCategories(
    @Param('id', new IntValidationPipe()) id: number,
  ): Promise<CategoryListResponseDto[]> {
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
