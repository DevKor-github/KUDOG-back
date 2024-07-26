import {
  InjectAccessUser,
  InjectRefreshUser,
  NamedController,
  injectLocalUser,
} from '@/common/decorators';
import { AuthDocs } from '@/common/decorators/docs';
import { JwtPayload, RefreshTokenPayload } from '@/common/types/auth';
import { Body, Delete, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ChangePasswordRequestDto,
  VerifyChangePasswordRequestDto,
} from './dtos/changePwdRequest.dto';
import { SignupRequestDto } from './dtos/signupRequest.dto';
import { TokenResponseDto } from './dtos/tokenResponse.dto';
import { JwtAccessGuard } from './passport/accessToken.strategy';
import { LocalGuard } from './passport/local.strategy';
import { JwtRefreshGuard } from './passport/refreshToken.strategy';

@AuthDocs
@NamedController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @LocalGuard()
  @Post('/login')
  async login(@injectLocalUser() user: number): Promise<TokenResponseDto> {
    return this.authService.getToken(user);
  }

  @Post('/signup')
  async signup(@Body() body: SignupRequestDto): Promise<TokenResponseDto> {
    const id = await this.authService.signup(body);
    return this.authService.getToken(id);
  }

  @JwtRefreshGuard()
  @Post('/refresh')
  async refresh(
    @InjectRefreshUser() user: RefreshTokenPayload,
  ): Promise<TokenResponseDto> {
    return this.authService.refreshJWT(user);
  }

  @JwtRefreshGuard()
  @Delete('/logout')
  async logout(@InjectRefreshUser() user: RefreshTokenPayload): Promise<void> {
    return this.authService.logout(user);
  }

  @JwtAccessGuard()
  @Delete('/user-info')
  async deleteUser(@InjectAccessUser() user: JwtPayload): Promise<void> {
    return this.authService.deleteUser(user.id);
  }

  @Post('/change-password/request')
  async changePwdRequest(
    @Body() body: ChangePasswordRequestDto,
  ): Promise<void> {
    return this.authService.changePwdRequest(body);
  }

  @Post('/change-password/verify')
  async verifyChangePwdCode(
    @Body() body: VerifyChangePasswordRequestDto,
  ): Promise<void> {
    return this.authService.verifyChangePwdCode(body);
  }

  @Put('/change-password')
  async changePassword(@Body() body: ChangePasswordDto): Promise<void> {
    return this.authService.changePassword(body);
  }
}
