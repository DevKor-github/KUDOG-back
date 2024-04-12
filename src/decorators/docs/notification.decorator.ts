import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DocumentedException } from 'src/interfaces/docsException';
import { NotificationInfoResponseDto } from 'src/notification/dtos/noticiationInfoResponse.dto';
import { TokenRequestDto } from 'src/notification/dtos/tokenRequest.dto';
import { ApiPagination } from './common.decorator';

type NotificationEndPoints =
  | 'getNotifications'
  | 'getNewNotifications'
  | 'registerToken'
  | 'deleteToken'
  | 'getTokenStatus';

export function Docs(endPoint: NotificationEndPoints) {
  switch (endPoint) {
    case 'getNotifications':
      return applyDecorators(
        ApiOperation({
          summary: '알림 내역 조회',
          description:
            '유저에게 지금까지 전송된 알림 내역을 제공합니다. Authorization : Bearer ${JWT}, 페이지네이션 가능합니다.',
        }),
        ApiPagination(),
        ApiOkResponse({
          type: NotificationInfoResponseDto,
        }),

        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
      );
    case 'getNewNotifications':
      return applyDecorators(
        ApiOperation({
          summary: '알림 내역 조회',
          description:
            '유저에게 새롭게 전송된 알림 내역을 제공합니다. 메인화면에 구독함 새로 올라갔어요! 알림에 쓰면 될듯해요 Authorization : Bearer ${JWT}, 페이지네이션 가능합니다.',
        }),
        ApiPagination(),
        ApiOkResponse({
          type: NotificationInfoResponseDto,
        }),
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
      );
    case 'registerToken':
      return applyDecorators(
        ApiOperation({
          summary: 'FCM Token 등록',
          description:
            'FCM Token을 등록합니다. Authorization : Bearer ${JWT}, getTokenStatus 호출 후, token이 등록되어있지 않을 때 사용해주세요.',
        }),
        ApiBody({
          type: TokenRequestDto,
        }),
        ApiCreatedResponse({
          description: 'Token 등록 성공',
        }),
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
      );
    case 'deleteToken':
      return applyDecorators(
        ApiOperation({
          summary: 'FCM Token 등록',
          description: 'FCM Token을 삭제합니다. Authorization : Bearer ${JWT}',
        }),
        ApiBody({
          type: TokenRequestDto,
        }),
        ApiOkResponse({
          description: 'Token 등록 성공',
        }),
        ApiUnauthorizedResponse({
          description: 'token 만료 또는 잘못된 token',
          type: DocumentedException,
        }),
      );
    case 'getTokenStatus':
      return applyDecorators(
        ApiOperation({
          summary: 'FCM Token 상태 조회',
          description:
            '클라이언트의 Token 상태를 제공합니다. Authorization : Bearer ${JWT}, Token이 만료될 때도 있다고 합니다. Token이 만료되면 서버에서 자동으로 삭제하니, getTokenStatus로 체크하고, false 시 token을 새로 발급하여 등록해주세요.',
        }),
        ApiQuery({
          name: 'token',
          type: String,
          required: true,
        }),
        ApiOkResponse({
          type: Boolean,
          description: '비활성화시 false, 등록 시 true',
        }),
      );
  }
}
