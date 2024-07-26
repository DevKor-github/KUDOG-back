import type { MethodNames } from '@/common/types/method';
import type { NotificationController } from '@/domain/notification/notification.controller';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { NotificationInfoResponseDto } from 'src/domain/notification/dtos/noticiationInfoResponse.dto';
import { TokenRequestDto } from 'src/domain/notification/dtos/tokenRequest.dto';
import { ApiPagination } from './common.decorator';

type NotificationEndPoints = MethodNames<NotificationController>;

const NotificationDocsMap: Record<NotificationEndPoints, MethodDecorator[]> = {
  getNotifications: [
    ApiOperation({
      summary: '알림 내역 조회',
      description:
        '유저에게 지금까지 전송된 알림 내역을 제공합니다. Authorization : Bearer ${JWT}, 페이지네이션 가능합니다.',
    }),
    ApiPagination(),
    ApiOkResponse({
      type: NotificationInfoResponseDto,
    }),
  ],
  getNewNotifications: [
    ApiOperation({
      summary: '알림 내역 조회',
      description:
        '유저에게 새롭게 전송된 알림 내역을 제공합니다. 메인화면에 구독함 새로 올라갔어요! 알림에 쓰면 될듯해요 Authorization : Bearer ${JWT}, 페이지네이션 가능합니다.',
    }),
    ApiPagination(),
    ApiOkResponse({
      type: NotificationInfoResponseDto,
    }),
  ],
  registerToken: [
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
  ],
  deleteToken: [
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
  ],
  getTokenStatus: [
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
  ],
  sendNotification: [
    ApiOperation({ deprecated: true, summary: '알림 전송 test' }),
  ],
};

export function NotificationDocs(target) {
  for (const key in NotificationDocsMap) {
    const methodDecorators =
      NotificationDocsMap[key as keyof typeof NotificationDocsMap];

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
