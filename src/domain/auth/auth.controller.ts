import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dtos/signupRequest.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { TokenResponseDto } from './dtos/tokenResponse.dto';
import {
  ChangePasswordDto,
  ChangePasswordRequestDto,
  VerifyChangePasswordRequestDto,
} from './dtos/changePwdRequest.dto';
import { Docs } from 'src/decorators/docs/auth.decorator';
import {
  InjectAccessUser,
  InjectRefreshUser,
  injectLocalUser,
} from 'src/decorators';
import { JwtPayload, RefreshTokenPayload } from 'src/interfaces/auth';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @Docs('login')
  async login(@injectLocalUser() user: number): Promise<TokenResponseDto> {
    return await this.authService.getToken(user);
  }

  @Post('/signup')
  @Docs('signup')
  async signup(@Body() body: SignupRequestDto): Promise<TokenResponseDto> {
    const id = await this.authService.signup(body);
    return await this.authService.getToken(id);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @Docs('refresh')
  async refresh(
    @InjectRefreshUser() user: RefreshTokenPayload,
  ): Promise<TokenResponseDto> {
    return await this.authService.refreshJWT(user);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Delete('/logout')
  @Docs('logout')
  async logout(@InjectRefreshUser() user: RefreshTokenPayload): Promise<void> {
    await this.authService.logout(user);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Delete('/user-info')
  @Docs('deleteUser')
  async deleteUser(@InjectAccessUser() user: JwtPayload): Promise<void> {
    await this.authService.deleteUser(user.id);
  }

  @Post('/change-password/request')
  @Docs('changePwdRequest')
  async changePwdRequest(
    @Body() body: ChangePasswordRequestDto,
  ): Promise<void> {
    await this.authService.changePwdRequest(body);
  }

  @Post('/change-password/verify')
  @Docs('verifyChangePwdCode')
  async verifyChangePwdCode(
    @Body() body: VerifyChangePasswordRequestDto,
  ): Promise<void> {
    await this.authService.verifyChangePwdCode(body);
  }

  @Put('/change-password')
  @Docs('changePassword')
  async changePassword(@Body() body: ChangePasswordDto): Promise<void> {
    await this.authService.changePassword(body);
  }
}
