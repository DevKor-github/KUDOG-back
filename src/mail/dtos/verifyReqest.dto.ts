import { ApiProperty } from '@nestjs/swagger';

export class verifyRequestDto {
  @ApiProperty({
    example: 'devkor@korea.ac.kr',
  })
  email: string;
}
