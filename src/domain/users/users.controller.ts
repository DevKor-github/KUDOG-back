import { InjectAccessUser, NamedController } from '@/common/decorators';
import { UserDocs } from '@/common/decorators/docs';
import { JwtPayload } from '@/common/types/auth';
import { Body, Get, Put } from '@nestjs/common';
import { JwtAccessGuard } from '../auth/passport/accessToken.strategy';
import { ModifyInfoRequestDto, UserInfoResponseDto } from './dtos/userInfo.dto';
import { UsersService } from './users.service';

@UserDocs
@NamedController('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @JwtAccessGuard()
  @Get('/info')
  async getUserInfo(
    @InjectAccessUser() user: JwtPayload,
  ): Promise<UserInfoResponseDto> {
    return this.userService.getUserInfo(user.id);
  }

  @JwtAccessGuard()
  @Put('/info')
  async modifyUserInfo(
    @InjectAccessUser() user: JwtPayload,
    @Body() body: ModifyInfoRequestDto,
  ): Promise<void> {
    return this.userService.modifyUserInfo(user.id, body);
  }
}
