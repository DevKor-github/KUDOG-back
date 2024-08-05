import { InjectToken, InjectUser, NamedController } from '@/common/decorators';
import { AuthDocs } from '@/common/decorators/docs';
import { UseValidation } from '@/common/decorators/useValidation';
import { JwtPayload } from '@/common/types/auth';
import { Body, Delete, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ChangePasswordRequestDto,
  VerifyChangePasswordRequestDto,
} from './dtos/changePwdRequest.dto';
import type { LoginRequestDto } from './dtos/loginRequestDto';
import { SignupRequestDto } from './dtos/signupRequest.dto';
import { TokenResponseDto } from './dtos/tokenResponse.dto';
import { UseJwtGuard } from './guards/jwt.guard';

@AuthDocs
@NamedController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseValidation(['NOT_ACCEPTABLE', 'EMAIL_NOT_VALID', 'PASSWORD_NOT_VALID'])
  @Post('/login')
  async login(@Body() body: LoginRequestDto): Promise<TokenResponseDto> {
    return this.authService.login(body);
  }

  @UseValidation(['NOT_ACCEPTABLE', 'EMAIL_NOT_VALID', 'PASSWORD_NOT_VALID'])
  @Post('/signup')
  async signup(@Body() body: SignupRequestDto): Promise<TokenResponseDto> {
    return this.authService.signup(body);
  }

  @UseJwtGuard()
  @Post('/refresh')
  async refresh(
    @InjectUser() user: JwtPayload,
    @InjectToken() token: string,
  ): Promise<TokenResponseDto> {
    return this.authService.refreshJWT(user, token);
  }

  @UseJwtGuard()
  @Delete('/logout')
  async logout(@InjectToken() token: string): Promise<void> {
    return this.authService.logout(token);
  }

  @UseJwtGuard()
  @Delete('/user-info')
  async deleteUser(@InjectUser() user: JwtPayload): Promise<void> {
    return this.authService.deleteUser(user.id);
  }

  @UseValidation(['NOT_ACCEPTABLE', 'EMAIL_NOT_VALID'])
  @Post('/change-password/request')
  async changePwdRequest(
    @Body() body: ChangePasswordRequestDto,
  ): Promise<void> {
    return this.authService.changePwdRequest(body);
  }

  @UseValidation(['NOT_ACCEPTABLE'])
  @Post('/change-password/verify')
  async verifyChangePwdCode(
    @Body() body: VerifyChangePasswordRequestDto,
  ): Promise<void> {
    return this.authService.verifyChangePwdCode(body);
  }

  @UseValidation(['NOT_ACCEPTABLE', 'EMAIL_NOT_VALID', 'PASSWORD_NOT_VALID'])
  @Put('/change-password')
  async changePassword(@Body() body: ChangePasswordDto): Promise<void> {
    return this.authService.changePassword(body);
  }
}
