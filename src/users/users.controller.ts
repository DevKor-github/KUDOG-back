import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { modifyInfoRequestDto, userInfoResponseDto } from './dtos/userInfo.dto';
import { DocumentedException } from 'src/interfaces/docsException';

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/info')
  @ApiOperation({
    summary: 'GET user info',
    description:
      'access token을 이용하여 내 정보를 가져옵니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
  })
  @ApiOkResponse({ description: '내 정보 get', type: userInfoResponseDto })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  @ApiNotFoundResponse({
    description: '존재하지 않는 유저입니다.',
    type: DocumentedException,
  })
  async getUserInfo(@Req() req: any) {
    return await this.userService.getUserInfo(req.user.id);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('/info')
  @ApiOperation({
    summary: 'modify user info',
    description:
      '내 정보를 수정합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요. 수정할 정보만 보내도 괜찮습니다.',
  })
  @ApiOkResponse({ description: '정보 수정 성공' })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  @ApiNotFoundResponse({
    description: '존재하지 않는 유저입니다.',
    type: DocumentedException,
  })
  async modifyUserInfo(@Req() req: any, @Body() body: modifyInfoRequestDto) {
    return await this.userService.modifyUserInfo(req.user.id, body);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/favorite-info')
  @ApiOperation({
    summary: 'favorite major info',
    description: '즐겨찾기하는 전공',
  })
  async getFavoriteMajorInfo(@Req() req: any) {
    // 해당 메소드에 대한 로직을 추가하세요.
  }
}
