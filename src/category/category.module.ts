// 컨트롤러와 서비스를 연결
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import {
  Category,
  CategoryPerSubscribeBoxEntity,
  ScrapBox,
  SubscribeBox,
} from 'src/entities';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      CategoryPerSubscribeBoxEntity,
      SubscribeBox,
      ScrapBox,
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
@ApiTags('categories')
export class CategoryModule {}
