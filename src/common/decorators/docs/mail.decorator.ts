import { ApiKudogExceptionResponse } from '@/common/decorators';
import type { MethodNames } from '@/common/types/method';
import type { MailController } from '@/domain/mail/mail.controller';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
type MailEndpoints = MethodNames<MailController>;

const MailDocsMap: Record<MailEndpoints, MethodDecorator[]> = {
  sendVerifyMail: [
    ApiOperation({
      summary: '인증 메일 전송',
      description:
        'korea.ac.kr 메일을 인증합니다. 10초 내에 재요청 시, 이미 인증된 메일을 요청할 시 에러가 발생합니다.',
    }),
    ApiCreatedResponse({ description: '메일 전송 성공' }),
    ApiKudogExceptionResponse([
      'EMAIL_ALREADY_USED',
      'TOO_MANY_REQUESTS',
      'EMAIL_NOT_IN_KOREA_DOMAIN',
      'TODO_INVALID',
    ]),
  ],
  checkVerifyCode: [
    ApiOperation({
      summary: '인증 코드 확인',
      description: '인증 코드를 확인합니다.',
    }),
    ApiCreatedResponse({
      description: '인증 성공',
    }),
  ],
};
export function MailDocs(target) {
  for (const key in MailDocsMap) {
    const methodDecorators = MailDocsMap[key as keyof typeof MailDocsMap];

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
