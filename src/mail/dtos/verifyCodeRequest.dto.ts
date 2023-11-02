import { ApiProperty } from '@nestjs/swagger';

export class verifyCodeRequestDto {
  @ApiProperty({
    example: 'devkor@korea.ac.kr',
  })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  code: string;
}
