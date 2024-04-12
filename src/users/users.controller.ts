import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ModifyInfoRequestDto, UserInfoResponseDto } from './dtos/userInfo.dto';
import { Docs } from 'src/decorators/docs/user.decorator';
import { InjectAccessUser } from 'src/decorators';
import { JwtPayload } from 'src/interfaces/auth';

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/info')
  @Docs('getUserInfo')
  async getUserInfo(
    @InjectAccessUser() user: JwtPayload,
  ): Promise<UserInfoResponseDto> {
    return await this.userService.getUserInfo(user.id);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('/info')
  @Docs('modifyUserInfo')
  async modifyUserInfo(
    @InjectAccessUser() user: JwtPayload,
    @Body() body: ModifyInfoRequestDto,
  ): Promise<void> {
    return await this.userService.modifyUserInfo(user.id, body);
  }
}
