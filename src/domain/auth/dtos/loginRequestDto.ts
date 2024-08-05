import { PickType } from '@nestjs/swagger';
import { SignupRequestDto } from './signupRequest.dto';

export class LoginRequestDto extends PickType(SignupRequestDto, [
  'password',
  'email',
] as const) {}
