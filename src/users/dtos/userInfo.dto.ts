import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { SignupRequestDto } from 'src/auth/dtos/signupRequest.dto';

export class modifyInfoRequestDto extends PartialType(
  PickType(SignupRequestDto, [
    'subscriberEmail',
    'name',
    'studentId',
    'grade',
    'major',
    'password',
  ] as const),
) {}

export class modifySubscriberEmailDto extends PickType(modifyInfoRequestDto, [
  'subscriberEmail',
] as const) {}

export class userInfoResponseDto {
  @ApiProperty({ example: '노정훈' })
  name: string;

  @ApiProperty({ example: '22학번' })
  studentId: string;

  @ApiProperty({ example: 2 })
  grade: number;

  @ApiProperty({ example: '컴퓨터학과' })
  major: string;

  @ApiProperty({ example: 'devkor.appply@gmail.com' })
  subscriberEmail: string;

  @ApiProperty({ example: 'devkor.apply@korea.ac.kr' })
  portalEmail: string;
}
