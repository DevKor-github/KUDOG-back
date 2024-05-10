import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupRequestDto {
  @IsString({ message: '이름은 문자열로 이루어져야 합니다.' })
  @IsNotEmpty({ message: '이름은 필수 항목입니다.' })
  @ApiProperty({ example: '홍길동' })
  name: string;

  @IsEmail({}, { message: '유효하지 않은 이메일 주소입니다.' })
  @IsNotEmpty({ message: '이메일 주소는 필수 항목입니다.' })
  @ApiProperty({ example: 'devkor.appply@gmail.com' })
  email: string;

  @IsString({ message: '비밀번호는 문자열로 이루어져야 합니다.' })
  @IsNotEmpty({ message: '비밀번호는 필수 항목입니다.' })
  @ApiProperty({ example: 'password1' })
  password: string;
}
