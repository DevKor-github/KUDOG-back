import { InjectAccessUser, NamedController } from '@/common/decorators';
import { UsePagination } from '@/common/decorators';

import { ScrapDocs } from '@/common/decorators/docs';
import { PageQuery } from '@/common/dtos/pageQuery';
import { PageResponse } from '@/common/dtos/pageResponse';
import { JwtPayload } from '@/common/types/auth';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IntValidationPipe } from 'src/pipes/intValidation.pipe';
import { JwtAccessGuard } from '../auth/passport/accessToken.strategy';
import { ScrapBoxRequestDto } from './dtos/scrapBoxRequest.dto';
import { ScrapBoxResponseDto } from './dtos/scrapBoxResponse.dto';
import { ScrapBoxResponseWithNotices } from './dtos/scrapBoxResponseWithNotices.dto';
import { ScrapService } from './scrap.service';

@ScrapDocs
@NamedController('scrap')
export class ScrapController {
  constructor(private readonly scrapService: ScrapService) {}

  @JwtAccessGuard()
  @Post('/box')
  async createScrapBox(
    @Body() body: ScrapBoxRequestDto,
    @InjectAccessUser() user: JwtPayload,
  ): Promise<ScrapBoxResponseDto> {
    return this.scrapService.createScrapBox(user.id, body);
  }

  @JwtAccessGuard()
  @Get('/box/:scrapBoxId')
  async getScrapBoxInfo(
    @Param('scrapBoxId', IntValidationPipe) scrapBoxId: number,
    @InjectAccessUser() user: JwtPayload,
  ): Promise<ScrapBoxResponseWithNotices> {
    return this.scrapService.getScrapBoxInfo(user.id, scrapBoxId);
  }

  @JwtAccessGuard()
  @Get('/box')
  async getScrapBoxes(
    @InjectAccessUser() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
  ): Promise<PageResponse<ScrapBoxResponseDto>> {
    return this.scrapService.getScrapBoxes(user.id, pageQuery);
  }

  @JwtAccessGuard()
  @Put('/box/:scrapBoxId')
  async updateScrapBox(
    @Param('scrapBoxId', IntValidationPipe) scrapBoxId: number,
    @InjectAccessUser() user: JwtPayload,
    @Body() body: ScrapBoxRequestDto,
  ): Promise<ScrapBoxResponseDto> {
    return this.scrapService.updateScrapBox(scrapBoxId, user.id, body);
  }

  @JwtAccessGuard()
  @Delete('/box/:scrapBoxId')
  async deleteScrapBox(
    @Param('scrapBoxId', IntValidationPipe) scrapBoxId: number,
    @InjectAccessUser() user: JwtPayload,
  ): Promise<void> {
    return this.scrapService.deleteScrapBox(scrapBoxId, user.id);
  }
}
