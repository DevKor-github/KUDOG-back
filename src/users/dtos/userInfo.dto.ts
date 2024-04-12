import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { SignupRequestDto } from 'src/auth/dtos/signupRequest.dto';
import { KudogUser } from 'src/entities';

export class ModifyInfoRequestDto extends PartialType(
  PickType(SignupRequestDto, ['email', 'name', 'password'] as const),
) {}

export class UserInfoResponseDto {
  @ApiProperty({ example: '노정훈' })
  name: string;

  @ApiProperty({ example: 'devkor.appply@gmail.com' })
  email: string;

  constructor(entity: KudogUser) {
    this.name = entity.name;
    this.email = entity.email;
  }
}
