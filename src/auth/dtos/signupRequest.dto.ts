import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupRequestDto {
  @IsString()
  @ApiProperty({ example: '홍길동' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'devkor.appply@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'password1' })
  password: string;
}
