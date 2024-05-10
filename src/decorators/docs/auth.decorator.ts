import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiRequestTimeoutResponse,
  ApiResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequestDto } from 'src/auth/dtos/loginRequestDto';
import { TokenResponseDto } from 'src/auth/dtos/tokenResponse.dto';
import { DocumentedException } from 'src/interfaces/docsException';

type AuthEndpoints =
  | 'login'
  | 'signup'
  | 'refresh'
  | 'logout'
  | 'deleteUser'
  | 'changePwdRequest'
  | 'verifyChangePwdCode'
  | 'changePassword';

export function Docs(endPoint: AuthEndpoints) {
  switch (endPoint) {
    case 'login':
      return applyDecorators(
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
        ApiUnauthorizedResponse({
          description: '로그인 실패',
          type: DocumentedException,
        }),
      );
    case 'signup':
      return applyDecorators(
        ApiOperation({
          description: '회원가입',
          summary: '회원가입',
        }),
        ApiCreatedResponse({
          description: '회원가입 성공 ',
          type: TokenResponseDto,
        }),
        ApiBadRequestResponse({
          description:
            'message : 인증 후 너무 오랜 시간이 지났습니다. 다시 인증해주세요. |인증되지 않은 이메일입니다. | 사용중인 이메일입니다.| korea.ac.kr 이메일이 아닙니다. | 비밀번호는 6~16자의 영문 소문자와 숫자로만 입력해주세요.',
          type: DocumentedException,
        }),
        ApiNotAcceptableResponse({
          description: '입력값이 유효하지 않습니다 - <변수명> 상세 정보',
          type: DocumentedException,
        }),
      );
    case 'refresh':
      return applyDecorators(
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
        ApiUnauthorizedResponse({
          description: '토큰 재발급 실패, 세부 사항은 에러 메시지에 있습니다.',
          type: DocumentedException,
        }),
      );
    case 'logout':
      return applyDecorators(
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
        ApiUnauthorizedResponse({
          description: 'invalid access token',
          type: DocumentedException,
        }),
        ApiNotFoundResponse({
          description: 'access token의 id값이 invalid',
          type: DocumentedException,
        }),
        ApiOkResponse({
          description: 'logout 성공',
        }),
      );
    case 'deleteUser':
      return applyDecorators(
        ApiOperation({
          summary: '회원 탈퇴',
          description:
            '회원 탈퇴합니다. authorization header에 Bearer ${accessToken} 을 담아주세요.',
        }),
        ApiUnauthorizedResponse({
          description: 'invalid access token',
          type: DocumentedException,
        }),
        ApiOkResponse({
          description: '회원 탈퇴 성공',
        }),
      );
    case 'changePwdRequest':
      return applyDecorators(
        ApiOperation({
          summary: '비밀번호 변경 이메일 인증 요청',
          description: '비밀번호를 변경하기 위하여 이메일 인증을 요청합니다.',
        }),
        ApiCreatedResponse({
          description: '이메일 전송 성공. 3분 안에 인증 코드를 입력해주세요.',
        }),
        ApiNotFoundResponse({
          description: '해당 이메일의 유저가 존재하지 않습니다.',
          type: DocumentedException,
        }),
        ApiTooManyRequestsResponse({
          description: '잠시 후에 다시 시도해주세요. (10초 내 재요청)',
          type: DocumentedException,
        }),
        ApiBadRequestResponse({
          description: 'korea.ac.kr 이메일을 입력하세요.',
          type: DocumentedException,
        }),
        ApiResponse({
          status: 510,
          description:
            '알 수 없는 이유로 메일 전송에 실패했습니다. 잠시 후에 다시 시도해주세요.',
          type: DocumentedException,
        }),
        ApiNotAcceptableResponse({
          description: '입력값이 유효하지 않습니다 - <변수명> 상세 정보',
          type: DocumentedException,
        }),
      );
    case 'verifyChangePwdCode':
      return applyDecorators(
        ApiOperation({
          summary: '비밀번호 변경 인증 코드 확인',
          description:
            '이메일로 전송된 인증 코드를 확인합니다. 제한시간은 3분이며, 인증 이후 10분 안에 비밀번호를 변경할 수 있습니다.',
        }),
        ApiCreatedResponse({
          description: '인증 성공, 비밀번호를 10분간 변경할 수 있습니다.',
        }),
        ApiBadRequestResponse({
          description: '인증 코드가 일치하지 않습니다.',
          type: DocumentedException,
        }),
        ApiRequestTimeoutResponse({
          description:
            '인증 요청 이후 3분이 지났습니다. 다시 메일 전송을 해주세요.',
          type: DocumentedException,
        }),
        ApiNotAcceptableResponse({
          description: '입력값이 유효하지 않습니다 - <변수명> 상세 정보',
          type: DocumentedException,
        }),
      );
    case 'changePassword':
      return applyDecorators(
        ApiOperation({
          summary: '비밀번호 변경',
          description:
            '비밀번호를 변경합니다. 인증 코드 확인 이후 10분 안에 비밀번호를 변경해주세요.',
        }),
        ApiOkResponse({ description: '비밀번호 변경 성공' }),
        ApiNotFoundResponse({
          description: '존재하지 않는 유저입니다.',
          type: DocumentedException,
        }),
        ApiUnauthorizedResponse({
          description: '인증 코드 인증이 완료되지 않았습니다.',
          type: DocumentedException,
        }),
        ApiRequestTimeoutResponse({
          description:
            '인증 이후 10분이 지났습니다. 다시 메일 전송을 해주세요.',
          type: DocumentedException,
        }),
        ApiNotAcceptableResponse({
          description: '입력값이 유효하지 않습니다 - <변수명> 상세 정보',
          type: DocumentedException,
        }),
      );
  }
}
