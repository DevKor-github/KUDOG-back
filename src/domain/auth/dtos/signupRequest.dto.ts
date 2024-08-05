import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignupRequestDto {
  @IsString({
    context: { exception: 'NOT_ACCEPTABLE' },
  })
  @IsNotEmpty({ context: { exception: 'NOT_ACCEPTABLE' } })
  @ApiProperty({ example: '홍길동' })
  name: string;

  @IsEmail(
    { host_whitelist: ['korea.ac.kr'] },
    { context: { exception: 'EMAIL_NOT_VALID' } },
  )
  @IsNotEmpty({
    context: { exception: 'NOT_ACCEPTABLE' },
  })
  @ApiProperty({
    example: 'devkor.appply@korea.ac.kr',
    description: 'korea.ac.kr 이메일만 입력받습니다.',
  })
  email: string;

  @Matches(/^(?=.*[a-zA-Z0-9])(?=.*[~!@#$%^&*])[a-zA-Z0-9~!@#$%^&*]{8,20}$/, {
    context: { exception: 'PASSWORD_NOT_VALID' },
  })
  @IsString({ context: { exception: 'NOT_ACCEPTABLE' } })
  @IsNotEmpty({
    context: { exception: 'NOT_ACCEPTABLE' },
  })
  @ApiProperty({
    example: 'password1~',
    description: '8~20자리 영어 + 숫자 + 특수문자 비밀번호',
  })
  password: string;
}
