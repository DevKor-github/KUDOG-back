import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { SignupRequestDto } from './signupRequest.dto';

export class ChangePasswordRequestDto extends PickType(SignupRequestDto, [
  'email',
] as const) {}

export class VerifyChangePasswordRequestDto {
  @MaxLength(6, { context: { exception: 'NOT_ACCEPTABLE' } })
  @MinLength(6, { context: { exception: 'NOT_ACCEPTABLE' } })
  @IsString({ context: { exception: 'NOT_ACCEPTABLE' } })
  @IsNotEmpty()
  @ApiProperty({ example: '102345', description: '인증코드, 6자리 숫자스트링' })
  code: string;
}

export class ChangePasswordDto extends PickType(SignupRequestDto, [
  'password',
  'email',
] as const) {}
