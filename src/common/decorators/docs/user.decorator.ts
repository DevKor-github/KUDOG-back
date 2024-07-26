import type { MethodNames } from '@/common/types/method';
import type { UsersController } from '@/domain/users/users.controller';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserInfoResponseDto } from 'src/domain/users/dtos/userInfo.dto';

type UserEndpoints = MethodNames<UsersController>;

const UserDocsMap: Record<UserEndpoints, MethodDecorator[]> = {
  getUserInfo: [
    ApiOperation({
      summary: 'GET user info',
      description:
        'access token을 이용하여 내 정보를 가져옵니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
    }),
    ApiOkResponse({
      description: '내 정보 get',
      type: UserInfoResponseDto,
    }),
  ],
  modifyUserInfo: [
    ApiOperation({
      summary: 'modify user info',
      description:
        '내 정보를 수정합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요. 수정할 정보만 보내도 괜찮습니다.',
    }),
    ApiOkResponse({ description: '정보 수정 성공' }),
  ],
};

export function UserDocs(target) {
  for (const key in UserDocsMap) {
    const methodDecorators = UserDocsMap[key as keyof typeof UserDocsMap];

    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
    if (descriptor) {
      for (const decorator of methodDecorators) {
        decorator(target.prototype, key, descriptor);
      }
      Object.defineProperty(target.prototype, key, descriptor);
    }
  }
  return target;
}
