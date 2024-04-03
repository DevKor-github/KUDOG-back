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
import {
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiResponse,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DocumentedException } from 'src/interfaces/docsException';
import { ScrapService } from './scrap.service';
import { ScrapBoxDto } from './dtos/scrapbox.dto';
@ApiTags('Scrap')
@Controller('scrap')
export class ScrapController {
  constructor(private readonly scrapService: ScrapService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Post('/box/byname')
  @ApiOperation({
    summary: '스크랩박스 생성',
    description: '사용자를 위한 새 스크랩박스를 생성합니다.',
  })
  @ApiBody({
    description: '스크랩박스 정보,스크랩박스 아이디',
    type: ScrapBoxDto,
  })
  @ApiResponse({
    description: '스크랩박스가 성공적으로 생성되었습니다.',
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청입니다.',
    type: DocumentedException,
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  async createScrapBox(
    @Body('userId') userId: number,
    @Body('boxName') boxName: string,
  ) {
    return this.scrapService.createScrapBox(userId, boxName);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/box/:userId/byname')
  @ApiOperation({
    summary: '사용자 스크랩박스 조회',
    description: '특정 사용자의 모든 스크랩박스를 조회합니다.',
  })
  @ApiParam({
    name: 'userId',
    type: 'number',
    description: '사용자 ID',
    example: 1,
  })
  @ApiResponse({ description: '조회 성공' })
  @ApiNotFoundResponse({
    description: '스크랩박스를 찾을 수 없습니다.',
    type: DocumentedException,
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  async getScrapBoxes(@Param('userId') userId: number) {
    return this.scrapService.getScrapBoxes(userId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('/box/:scrapBoxId/rename')
  @ApiOperation({
    summary: '스크랩박스 이름 변경',
    description: '스크랩박스의 이름을 변경합니다.',
  })
  @ApiParam({
    name: 'scrapBoxId',
    type: 'number',
    description: '스크랩박스 ID',
  })
  @ApiBody({
    description: '새 스크랩박스 이름,스크랩박스 id',
    type: ScrapBoxDto,
  })
  @ApiResponse({
    description: '스크랩박스 이름이 성공적으로 변경되었습니다.',
  })
  @ApiNotFoundResponse({
    description: '해당 스크랩박스가 존재하지 않습니다',
    type: DocumentedException,
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  async updateScrapBox(
    @Param('scrapBoxId') scrapBoxId: number,
    @Body('name') newName: string,
  ) {
    return this.scrapService.updateScrapBox(scrapBoxId, newName);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Delete('/box/:scrapBoxId')
  @ApiOperation({
    summary: '스크랩박스 삭제',
    description: '특정 이름의 스크랩박스를 삭제합니다.',
  })
  @ApiParam({
    name: 'scrapBoxId',
    type: 'number',
    required: true,
    description: '스크랩박스 ID',
    example: 1,
  })
  @ApiResponse({
    description: '스크랩박스가 성공적으로 삭제되었습니다.',
  })
  @ApiNotFoundResponse({
    description: '해당 스크랩박스를 찾을 수 없습니다.',
    type: DocumentedException,
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  async deleteScrapBox(@Param('scrapBoxId') scrapBoxId: number) {
    return this.scrapService.deleteScrapBox(scrapBoxId);
  }
}
