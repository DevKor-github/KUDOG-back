import { Controller, Post, UseGuards, Body, Delete } from '@nestjs/common';
import { PushService } from './push.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags,ApiBody,ApiCreatedResponse } from '@nestjs/swagger';
import { User } from 'src/decorators';
import { JwtPayload } from 'src/interfaces/auth';
import { CreateUserTokenDto } from './dtos/CreateUserToken.dto';
import { FcmToken } from 'src/entities/fcmtoken.entity';
@Controller('push')
@ApiTags('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Post('/token')
  @ApiOperation({
    summary: '사용자를 위한 fcm토큰 생성',
    description: '사용자에게 보낼 토큰 저장',
  })
  @ApiBody({ type: CreateUserTokenDto, description: '사용자와 매핑할 토큰' })
  @ApiCreatedResponse({ description: '회원가입 성공', type: FcmToken })
  async createUserToken(
    @Body() createUserTokenDto: CreateUserTokenDto,
    @User() user: JwtPayload,
  ): Promise<FcmToken> {
    return this.pushService.createUserToken(user.id, createUserTokenDto);
  }
  @UseGuards(AuthGuard('jwt-access'))
  @Delete('/token')
  @ApiOperation({
    summary: 'FCM 토큰 삭제',
    description: '인증된 사용자의 토큰을 삭제합니다.',
  })
  async deleteUserToken(
    @Body() token: string,
    @User() user: JwtPayload,
  ): Promise<void> {
    await this.pushService.deleteUserToken(user.id, token);
  }
}
