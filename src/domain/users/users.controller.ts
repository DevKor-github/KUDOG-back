import { InjectUser, NamedController } from '@/common/decorators';
import { UserDocs } from '@/common/decorators/docs';
import { JwtPayload } from '@/common/types/auth';
import { Body, Get, Put } from '@nestjs/common';
import { UseJwtGuard } from '../auth/guards/jwt.guard';
import { ModifyInfoRequestDto, UserInfoResponseDto } from './dtos/userInfo.dto';
import { UsersService } from './users.service';

@UserDocs
@NamedController('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseJwtGuard()
  @Get('/info')
  async getUserInfo(
    @InjectUser() user: JwtPayload,
  ): Promise<UserInfoResponseDto> {
    return this.userService.getUserInfo(user.id);
  }

  @UseJwtGuard()
  @Put('/info')
  async modifyUserInfo(
    @InjectUser() user: JwtPayload,
    @Body() body: ModifyInfoRequestDto,
  ): Promise<void> {
    return this.userService.modifyUserInfo(user.id, body);
  }
}
