import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { SignupRequestDto } from 'src/auth/dtos/signupRequest.dto';

export class modifyInfoRequestDto extends PartialType(
  PickType(SignupRequestDto, ['email', 'name', 'password'] as const),
) {}

export class userInfoResponseDto {
  @ApiProperty({ example: '노정훈' })
  name: string;

  @ApiProperty({ example: 'devkor.appply@gmail.com' })
  email: string;
}
