import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({ example: 'asdas.zxcvz.asdf' })
  accessToken: string;

  @ApiProperty({ example: 'asdas.zxcvz.asdf' })
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
