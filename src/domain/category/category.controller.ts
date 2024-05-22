import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { IntValidationPipe } from 'src/pipes/intValidation.pipe';
import { InjectAccessUser } from 'src/decorators';
import { JwtPayload } from 'src/interfaces/auth';
import { ProviderListResponseDto } from './dtos/ProviderListResponse.dto';
import { CategoryListResponseDto } from './dtos/categoryListResponse.dto';
import { Docs } from 'src/decorators/docs/category.decorator';
@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Docs('getProviders')
  @Get('/providers')
  async getProviders(): Promise<ProviderListResponseDto[]> {
    return this.categoryService.getProviders();
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Docs('getCategories')
  @Get('/by-providers/:id')
  async getCategories(
    @Param('id', IntValidationPipe) id: number,
  ): Promise<CategoryListResponseDto[]> {
    return this.categoryService.getCategories(id);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Docs('getBookmarkedProviders')
  @Get('/providers/bookmarks')
  async getBookmarkedProviders(
    @InjectAccessUser() user: JwtPayload,
  ): Promise<ProviderListResponseDto[]> {
    return this.categoryService.getBookmarkedProviders(user.id);
  }
}
