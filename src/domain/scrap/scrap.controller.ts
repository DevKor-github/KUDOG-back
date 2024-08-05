import { InjectUser, NamedController } from '@/common/decorators';
import { UsePagination } from '@/common/decorators';

import { ScrapDocs } from '@/common/decorators/docs';
import { PageQuery } from '@/common/dtos/pageQuery';
import { PageResponse } from '@/common/dtos/pageResponse';
import { JwtPayload } from '@/common/types/auth';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IntValidationPipe } from 'src/pipes/intValidation.pipe';
import { UseJwtGuard } from '../auth/guards/jwt.guard';
import { ScrapBoxRequestDto } from './dtos/scrapBoxRequest.dto';
import { ScrapBoxResponseDto } from './dtos/scrapBoxResponse.dto';
import { ScrapBoxResponseWithNotices } from './dtos/scrapBoxResponseWithNotices.dto';
import { ScrapService } from './scrap.service';

@ScrapDocs
@NamedController('scrap')
export class ScrapController {
  constructor(private readonly scrapService: ScrapService) {}

  @UseJwtGuard()
  @Post('/box')
  async createScrapBox(
    @Body() body: ScrapBoxRequestDto,
    @InjectUser() user: JwtPayload,
  ): Promise<ScrapBoxResponseDto> {
    return this.scrapService.createScrapBox(user.id, body);
  }

  @UseJwtGuard()
  @Get('/box/:scrapBoxId')
  async getScrapBoxInfo(
    @Param('scrapBoxId', IntValidationPipe) scrapBoxId: number,
    @InjectUser() user: JwtPayload,
  ): Promise<ScrapBoxResponseWithNotices> {
    return this.scrapService.getScrapBoxInfo(user.id, scrapBoxId);
  }

  @UseJwtGuard()
  @Get('/box')
  async getScrapBoxes(
    @InjectUser() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
  ): Promise<PageResponse<ScrapBoxResponseDto>> {
    return this.scrapService.getScrapBoxes(user.id, pageQuery);
  }

  @UseJwtGuard()
  @Put('/box/:scrapBoxId')
  async updateScrapBox(
    @Param('scrapBoxId', IntValidationPipe) scrapBoxId: number,
    @InjectUser() user: JwtPayload,
    @Body() body: ScrapBoxRequestDto,
  ): Promise<ScrapBoxResponseDto> {
    return this.scrapService.updateScrapBox(scrapBoxId, user.id, body);
  }

  @UseJwtGuard()
  @Delete('/box/:scrapBoxId')
  async deleteScrapBox(
    @Param('scrapBoxId', IntValidationPipe) scrapBoxId: number,
    @InjectUser() user: JwtPayload,
  ): Promise<void> {
    return this.scrapService.deleteScrapBox(scrapBoxId, user.id);
  }
}
