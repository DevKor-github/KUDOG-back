import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ScrapService } from './scrap.service';
import { ScrapBoxRequestDto } from './dtos/scrapBoxRequest.dto';
import { User } from 'src/decorators';
import { JwtPayload } from 'src/interfaces/auth';
import { ScrapBoxResponseDto } from './dtos/scrapBoxResponse.dto';
import { Docs } from 'src/decorators/docs/scrap.decorator';
import { ScrapBoxResponseWithNotices } from './dtos/scrapBoxResponseWithNotices.dto';
import { UsePagination } from 'src/decorators/usePagination.decorator';
import { PageQuery } from 'src/interfaces/pageQuery';
import { PageResponse } from 'src/interfaces/pageResponse';
@ApiTags('Scrap')
@Controller('scrap')
export class ScrapController {
  constructor(private readonly scrapService: ScrapService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Post('/box')
  @Docs('createScrapBox')
  async createScrapBox(
    @Body() body: ScrapBoxRequestDto,
    @User() user: JwtPayload,
  ): Promise<ScrapBoxResponseDto> {
    return await this.scrapService.createScrapBox(user.id, body);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/box/:scrapBoxId')
  @Docs('getScrapBoxInfo')
  async getScrapBoxInfo(
    @Param('scrapBoxId') scrapBoxId: number,
    @User() user: JwtPayload,
  ): Promise<ScrapBoxResponseWithNotices> {
    return await this.scrapService.getScrapBoxInfo(user.id, scrapBoxId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/box')
  @Docs('getScrapBoxes')
  async getScrapBoxes(
    @User() user: JwtPayload,
    @UsePagination() pageQuery: PageQuery,
  ): Promise<PageResponse<ScrapBoxResponseDto>> {
    return await this.scrapService.getScrapBoxes(user.id, pageQuery);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('/box/:scrapBoxId')
  @Docs('updateScrapBox')
  async updateScrapBox(
    @Param('scrapBoxId') scrapBoxId: number,
    @User() user: JwtPayload,
    @Body() body: ScrapBoxRequestDto,
  ): Promise<ScrapBoxResponseDto> {
    return await this.scrapService.updateScrapBox(scrapBoxId, user.id, body);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Delete('/box/:scrapBoxId')
  @Docs('deleteScrapBox')
  async deleteScrapBox(
    @Param('scrapBoxId') scrapBoxId: number,
    @User() user: JwtPayload,
  ): Promise<void> {
    return await this.scrapService.deleteScrapBox(scrapBoxId, user.id);
  }
}
