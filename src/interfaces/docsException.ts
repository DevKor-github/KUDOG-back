import { ApiProperty } from '@nestjs/swagger';

export class DocumentedException {
  @ApiProperty({ example: 401 })
  status: number;

  @ApiProperty({ example: '인증되지 않은 이메일입니다.' })
  message: string;

  @ApiProperty({ example: 'UnauthorizedException' })
  name: string;

  response: {
    message: string;
    error: string;
    statusCode: number;
  };
}
