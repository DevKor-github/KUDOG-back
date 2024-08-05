import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class FindOneParams {
  @IsPositive({ context: { exception: 'NOT_ACCEPTABLE' } })
  @IsInt({ context: { exception: 'NOT_ACCEPTABLE' } })
  @Transform(({ value }) => Number(value))
  @ApiProperty({ example: 1 })
  id: number;
}
