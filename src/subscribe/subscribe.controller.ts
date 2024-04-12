import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { AuthGuard } from '@nestjs/passport';
import { Docs } from 'src/decorators/docs/subscribe.decorator';
import { SubscribeBoxRequestDto } from './dtos/subscribeBoxRequest.dto';
import { JwtPayload } from 'src/interfaces/auth';
import { User } from 'src/decorators';
import { SubscribeBoxResponseDtoWithNotices } from './dtos/subscribeBoxResponseWithNotices.dto';
import { SubscribeBoxResponseDto } from './dtos/subscribeBoxResponse.dto';
import { ApiTags } from '@nestjs/swagger';
import { PageResponse } from 'src/interfaces/pageResponse';
import { UsePagination } from 'src/decorators';
import { PageQuery } from 'src/interfaces/pageQuery';

@ApiTags('Subscribe')
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Post('/box')
  @Docs('createSubscribeBox')
  async createSubscribeBox(
    @Body() body: SubscribeBoxRequestDto,
    @User() user: JwtPayload,
  ): Promise<SubscribeBoxResponseDto> {
    return await this.subscribeService.createSubscribeBox(user.id, body);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/box/:subscribeBoxId')
  @Docs('getSubscribeBoxInfo')
  async getSubscribeInfo(
    @Param('subscribeBoxId') subscribeBoxId: number,
    @User() user: JwtPayload,
    @Query('date') date: string,
  ): Promise<SubscribeBoxResponseDtoWithNotices> {
    return await this.subscribeService.getSubscribeBoxInfo(
      user.id,
      subscribeBoxId,
      date,
    );
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/box')
  @Docs('getSubscribeBoxes')
  async getSubscribees(
    @User() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
  ): Promise<PageResponse<SubscribeBoxResponseDto>> {
    return await this.subscribeService.getSubscribeBoxes(user.id, pageQuery);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('/box/:subscribeBoxId')
  @Docs('updateSubscribeBox')
  async updateSubscribe(
    @Param('subscribeBoxId') subscribeBoxId: number,
    @User() user: JwtPayload,
    @Body() body: SubscribeBoxRequestDto,
  ): Promise<SubscribeBoxResponseDto> {
    return await this.subscribeService.updateSubscribeBox(
      subscribeBoxId,
      user.id,
      body,
    );
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Delete('/box/:subscribeBoxId')
  @Docs('deleteSubscribeBox')
  async deleteSubscribe(
    @Param('subscribeBoxId') subscribeBoxId: number,
    @User() user: JwtPayload,
  ): Promise<void> {
    return await this.subscribeService.deleteSubscribeBox(
      subscribeBoxId,
      user.id,
    );
  }
}
