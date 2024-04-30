import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DocumentedException } from 'src/interfaces/docsException';
import { UserInfoResponseDto } from 'src/users/dtos/userInfo.dto';

type UserEndpoints = 'getUserInfo' | 'modifyUserInfo';

export function Docs(endPoint: UserEndpoints) {
  switch (endPoint) {
    case 'getUserInfo':
      return applyDecorators(
        ApiOperation({
          summary: 'GET user info',
          description:
            'access token을 이용하여 내 정보를 가져옵니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
        }),
        ApiOkResponse({
          description: '내 정보 get',
          type: UserInfoResponseDto,
        }),
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
        ApiNotFoundResponse({
          description: '존재하지 않는 유저입니다.',
          type: DocumentedException,
        }),
      );
    case 'modifyUserInfo':
      return applyDecorators(
        ApiOperation({
          summary: 'modify user info',
          description:
            '내 정보를 수정합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요. 수정할 정보만 보내도 괜찮습니다.',
        }),
        ApiOkResponse({ description: '정보 수정 성공' }),
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
        ApiNotFoundResponse({
          description: '존재하지 않는 유저입니다.',
          type: DocumentedException,
        }),
      );
  }
}
