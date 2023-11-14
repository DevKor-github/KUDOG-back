import { ApiProperty } from '@nestjs/swagger';

export class CategoryReponseDto {
  @ApiProperty({
    example: '컴퓨터학부',
  })
  category: string;
}
