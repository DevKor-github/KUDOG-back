import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { SignupRequestDto } from 'src/domain/auth/dtos/signupRequest.dto';
import { KudogUser } from 'src/entities';

export class ModifyInfoRequestDto extends PartialType(
  PickType(SignupRequestDto, ['email', 'name', 'password'] as const),
) {
  @ApiProperty({
    description: '이메일 전송 시간 HH:MM ',
    example: '18:00',
  })
  sendTime?: string;

  @ApiProperty({
    description: '즐겨찾는 학과 수정 by id',
    example: ['14', '23', '11'],
  })
  providerBookmarks?: number[];
}

export class UserInfoResponseDto {
  @ApiProperty({ example: '노정훈' })
  name: string;

  @ApiProperty({ example: 'devkor.appply@gmail.com' })
  email: string;

  @ApiProperty({ example: '18:00' })
  sendTime: string;

  @ApiProperty({ example: ['미디어학부', 'KUPID', '정보대학'] })
  providerBookmarks: string[];

  constructor(entity: KudogUser) {
    this.name = entity.name;
    this.email = entity.email;
    this.sendTime = entity.sendTime;
    this.providerBookmarks = entity.providerBookmarks.map(
      (bookmark) => bookmark.provider.name,
    );
  }
}
