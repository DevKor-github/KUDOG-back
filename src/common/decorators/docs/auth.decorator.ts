import { ApiKudogExceptionResponse } from '@/common/decorators';
import type { MethodNames } from '@/common/types/method';
import type { AuthController } from '@/domain/auth/auth.controller';
import { LoginRequestDto } from '@/domain/auth/dtos/loginRequestDto';
import { TokenResponseDto } from '@/domain/auth/dtos/tokenResponse.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

type AuthEndpoints = MethodNames<AuthController>;

const AuthDocsMap: Record<AuthEndpoints, MethodDecorator[]> = {
  login: [
    ApiOperation({
      description:
        'portal email, password를 통해 로그인, access, refresh JWT 발급',
      summary: '로그인',
    }),
    ApiBody({
      type: LoginRequestDto,
      description: 'portal email을 이용하여 로그인합니다.',
    }),
    ApiCreatedResponse({
      description: '로그인 성공',
      type: TokenResponseDto,
    }),
    ApiKudogExceptionResponse(['LOGIN_FAILED']),
  ],
  signup: [
    ApiOperation({
      description: '회원가입',
      summary: '회원가입',
    }),
    ApiCreatedResponse({
      description: '회원가입 성공 ',
      type: TokenResponseDto,
    }),
    ApiKudogExceptionResponse([
      'EMAIL_VALIDATION_EXPIRED',
      'EMAIL_NOT_VALIDATED',
      'EMAIL_ALREADY_USED',
    ]),
  ],
  refresh: [
    ApiHeader({
      description:
        'Authorization header에 Bearer token 형태로 refresh token을 넣어주세요.',
      name: 'authorization',
      required: true,
    }),
    ApiOperation({
      description:
        'refresh token을 통해 access token 재발급, refresh token도 회전됩니다.',
      summary: '토큰 재발급',
    }),
    ApiCreatedResponse({
      description: '토큰 재발급 성공',
      type: TokenResponseDto,
    }),
    ApiKudogExceptionResponse(['LOGIN_REQUIRED']),
  ],
  logout: [
    ApiOperation({
      summary: '로그아웃',
      description:
        'refresh token을 삭제합니다. storage에서 두 토큰을 삭제해주세요. authorization header에 Bearer ${accessToken} 을 담아주세요.',
    }),
    ApiHeader({
      description:
        'Authorization header에 Bearer token 형태로 refresh token을 넣어주세요.',
      name: 'authorization',
      required: true,
    }),
    ApiKudogExceptionResponse(['JWT_TOKEN_INVALID']),
    ApiOkResponse({
      description: 'logout 성공',
    }),
  ],
  deleteUser: [
    ApiOperation({
      summary: '회원 탈퇴',
      description:
        '회원 탈퇴합니다. authorization header에 Bearer ${accessToken} 을 담아주세요.',
    }),
    ApiKudogExceptionResponse(['USER_NOT_FOUND']),
    ApiOkResponse({
      description: '회원 탈퇴 성공',
    }),
  ],
  changePwdRequest: [
    ApiOperation({
      summary: '비밀번호 변경 이메일 인증 요청',
      description: '비밀번호를 변경하기 위하여 이메일 인증을 요청합니다.',
    }),
    ApiCreatedResponse({
      description: '이메일 전송 성공. 3분 안에 인증 코드를 입력해주세요.',
    }),
    ApiKudogExceptionResponse([
      'EMAIL_NOT_FOUND',
      'TOO_MANY_REQUESTS',
      'EMAIL_SEND_FAILED',
    ]),
  ],
  verifyChangePwdCode: [
    ApiOperation({
      summary: '비밀번호 변경 인증 코드 확인',
      description:
        '이메일로 전송된 인증 코드를 확인합니다. 제한시간은 3분이며, 인증 이후 10분 안에 비밀번호를 변경할 수 있습니다.',
    }),
    ApiCreatedResponse({
      description: '인증 성공, 비밀번호를 10분간 변경할 수 있습니다.',
    }),
    ApiKudogExceptionResponse([
      'CODE_EXPIRED',
      'CODE_NOT_CORRECT',
      'TODO_INVALID',
    ]),
  ],
  changePassword: [
    ApiOperation({
      summary: '비밀번호 변경',
      description:
        '비밀번호를 변경합니다. 인증 코드 확인 이후 10분 안에 비밀번호를 변경해주세요.',
    }),
    ApiOkResponse({ description: '비밀번호 변경 성공' }),
    ApiKudogExceptionResponse([
      'USER_NOT_FOUND',
      'CODE_NOT_VALIDATED',
      'CODE_VALIDATION_EXPIRED',
    ]),
  ],
};

export function AuthDocs(target) {
  for (const key in AuthDocsMap) {
    const methodDecorators = AuthDocsMap[key as keyof typeof AuthDocsMap];

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
