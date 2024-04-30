import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiRequestTimeoutResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { DocumentedException } from 'src/interfaces/docsException';

type MailEndpoints = 'sendVerifyMail' | 'checkVerifyCode';

export function Docs(endPoint: MailEndpoints) {
  switch (endPoint) {
    case 'sendVerifyMail':
      return applyDecorators(
        ApiOperation({
          summary: '인증 메일 전송',
          description:
            'korea.ac.kr 메일을 인증합니다. 10초 내에 재요청 시, 이미 인증된 메일을 요청할 시 에러가 발생합니다.',
        }),
        ApiCreatedResponse({ description: '메일 전송 성공' }),
        ApiConflictResponse({
          description: '사용중인 메일',
          type: DocumentedException,
        }),
        ApiTooManyRequestsResponse({
          description: '10초 내 재요청',
          type: DocumentedException,
        }),
        ApiBadRequestResponse({
          description: 'korea.ac.kr 메일이 아님',
          type: DocumentedException,
        }),
      );
    case 'checkVerifyCode':
      return applyDecorators(
        ApiOperation({
          summary: '인증 코드 확인',
          description: '인증 코드를 확인합니다.',
        }),
        ApiCreatedResponse({
          description: '인증 성공',
          type: DocumentedException,
        }),
        ApiConflictResponse({
          description: '이미 인증된 메일',
          type: DocumentedException,
        }),
        ApiNotFoundResponse({
          description: '해당 메일이 존재하지 않음',
          type: DocumentedException,
        }),
        ApiBadRequestResponse({
          description: '인증 코드 불일치',
          type: DocumentedException,
        }),
        ApiRequestTimeoutResponse({
          description: '요청한지 3분 경과',
          type: DocumentedException,
        }),
      );
  }
}
