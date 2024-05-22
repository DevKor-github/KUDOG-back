import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenRequestDto {
  @ApiProperty({ description: '토큰', example: 'fcmToken' })
  @IsString({ message: '토큰은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '토큰은 필수 항목입니다.' })
  token: string;
}
