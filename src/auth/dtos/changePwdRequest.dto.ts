import { ApiProperty, PickType } from '@nestjs/swagger';
import { SignupRequestDto } from './signupRequest.dto';
import { IsString } from 'class-validator';

export class ChangePasswordRequestDto extends PickType(SignupRequestDto, [
  'email',
] as const) {}

export class VerifyChangePasswordRequestDto {
  @IsString({ message: 'code는 숫자로 이루어진 문자열이어야 합니다.' })
  @ApiProperty({ example: '102345', description: '인증코드' })
  code: string;
}

export class ChangePasswordDto extends PickType(SignupRequestDto, [
  'password',
  'email',
] as const) {}
