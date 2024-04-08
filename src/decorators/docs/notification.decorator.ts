import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DocumentedException } from 'src/interfaces/docsException';
import { NotificationCreateDto } from 'src/notification/dtos/NotificationCreate.dto';

type NotificationEndPoints = 'getNotifications' | 'sendNotification';

export function Docs(endPoint: NotificationEndPoints) {
  switch (endPoint) {
    case 'getNotifications':
      return applyDecorators(
        ApiOperation({
          summary: '알림 조회',
          description: '특정 사용자의 알림을 조회합니다.',
        }),
        ApiParam({
          name: 'userId',
          description: '조회할 알림의 사용자 ID',
          type: 'number',
          required: true,
        }),
        ApiOkResponse({
          description: '알림 조회 성공',
          type: NotificationCreateDto, // 응답으로 반환되는 데이터 형식에 맞게 수정 필요
        }),
        ApiUnauthorizedResponse({
          description: '인증되지 않은 사용자 요청',
        }),
      );
    case 'sendNotification':
      return applyDecorators(
        ApiOperation({
          summary: '알림 전송',
          description: '사용자에게 알림을 전송하고 데이터베이스에 저장합니다.',
        }),
        ApiBody({
          description: '알림 내용',
          type: NotificationCreateDto, // 요청으로 받는 데이터 형식에 맞게 수정 필요
        }),
        ApiCreatedResponse({
          description: '알림 전송 및 저장 성공',
        }),
        ApiUnauthorizedResponse({
          description: '인증되지 않은 사용자 요청',
        }),
      );
  }
}
