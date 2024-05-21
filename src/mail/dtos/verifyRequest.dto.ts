import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class verifyRequestDto {
  @ApiProperty({
    example: 'devkor@korea.ac.kr',
  })
  @IsNotEmpty({ message: '이메일 주소는 필수 항목입니다.' })
  @IsEmail(
    { host_whitelist: ['korea.ac.kr'] },
    { message: '유효한 이메일 주소를 입력해주세요.' },
  )
  email: string;
}
