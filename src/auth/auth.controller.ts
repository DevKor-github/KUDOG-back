import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dtos/signupRequest.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TokenResponseDto } from './dtos/tokenResponse.dto';
import { DocumentedException } from 'src/interfaces/docsException';
import { LoginRequestDto } from './dtos/loginRequestDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({
    description:
      'portal email, password를 통해 로그인, access, refresh JWT 발급',
    summary: '로그인',
  })
  @ApiBody({
    type: LoginRequestDto,
    description: 'portal email을 이용하여 로그인합니다.',
  })
  @ApiCreatedResponse({ description: '로그인 성공', type: TokenResponseDto })
  @ApiUnauthorizedResponse({
    description: '로그인 실패',
    type: DocumentedException,
  })
  async login(@Req() req: any) {
    try {
      return await this.authService.getToken(req.user);
    } catch (err) {
      return err;
    }
  }

  @Post('/signup')
  @ApiOperation({
    description: '회원가입',
    summary: '회원가입',
  })
  @ApiCreatedResponse({ description: '회원가입 성공', type: TokenResponseDto })
  @ApiBadRequestResponse({
    description: '회원가입 실패, 세부 사항은 에러 메시지에 있습니다.',
    type: DocumentedException,
  })
  async signup(@Body() body: SignupRequestDto) {
    try {
      const id = await this.authService.signup(body);
      return await this.authService.getToken(id);
    } catch (err) {
      return err;
    }
  }

  @Post('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @ApiHeader({
    description:
      'Authorization header에 Bearer token 형태로 refresh token을 넣어주세요.',
    name: 'authorization',
    required: true,
  })
  @ApiOperation({
    description:
      'refresh token을 통해 access token 재발급, refresh token도 회전됩니다.',
    summary: '토큰 재발급',
  })
  @ApiCreatedResponse({
    description: '토큰 재발급 성공',
    type: TokenResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: '토큰 재발급 실패, 세부 사항은 에러 메시지에 있습니다.',
    type: DocumentedException,
  })
  async refresh(@Req() req: any) {
    try {
      return await this.authService.refreshJWT(
        req.user.id,
        req.user.refreshToken,
      );
    } catch (err) {
      return err;
    }
  }
}
