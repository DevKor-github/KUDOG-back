import { ApiProperty, PickType } from '@nestjs/swagger';
import { SignupRequestDto } from './signupRequest.dto';
import { IsString } from 'class-validator';

export class ChangePasswordRequestDto extends PickType(SignupRequestDto, [
  'email',
] as const) {}

export class VerifyChangePasswordRequestDto {
  @IsString()
  @ApiProperty({ example: '102345', description: '인증코드' })
  code: string;
}

export class ChangePasswordDto extends PickType(SignupRequestDto, [
  'password',
  'email',
] as const) {}
