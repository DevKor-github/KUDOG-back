import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class verifyCodeRequestDto {
  @ApiProperty({
    example: 'devkor@korea.ac.kr',
  })
  @IsNotEmpty({ message: '이메일 주소는 필수 항목입니다.' })
  @IsEmail(
    { host_whitelist: ['korea.ac.kr'] },
    { message: '유효한 이메일 주소를 입력해주세요.' },
  )
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty({ message: '코드는 필수 항목입니다.' })
  @IsString({ message: '코드는 숫자로 이루어진 문자열이어야 합니다.' })
  @MinLength(6, { message: '코드는 6자리여야 합니다.' })
  @MaxLength(6, { message: '코드는 6자리여야 합니다.' })
  code: string;
}
