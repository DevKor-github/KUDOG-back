import { ApiProperty } from '@nestjs/swagger';

export class TokenRequestDto {
  @ApiProperty({ description: '토큰', example: 'fcmToken' })
  token: string;
}
