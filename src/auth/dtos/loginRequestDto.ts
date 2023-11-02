import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    example: 'devkor.apply@gmail.com',
    description: 'portal email을 이용하여 로그인합니다.',
  })
  email: string;
  @ApiProperty({ example: 'password1' })
  password: string;
}
