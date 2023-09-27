import { Body, Controller, Get} from '@nestjs/common';
import { CategoryService } from './category.service';
import { get } from 'http';
import Category from 'src/entities/categry.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
@Get('/List')
async getList(){
  try  {
  return  this.categoryService.getList();
}
catch(err){
console.log(err)
}
}

  

  // TODO: category List get api
  // SWAGGER 작성 - status code, data 형식 명시

  // TODO: 유저 카테고리 구독 POST api
  // SWAGGER 작성 - status code, data 형식 
}