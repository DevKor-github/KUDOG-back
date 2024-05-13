import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScrapBoxEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { ScrapBoxResponseDto } from './dtos/scrapBoxResponse.dto';
import { ScrapBoxRequestDto } from './dtos/scrapBoxRequest.dto';
import { ScrapBoxResponseWithNotices } from './dtos/scrapBoxResponseWithNotices.dto';
import { PageResponse } from 'src/interfaces/pageResponse';
import { PageQuery } from 'src/interfaces/pageQuery';

@Injectable()
export class ScrapService {
  constructor(
    @InjectRepository(ScrapBoxEntity)
    private readonly scrapBoxRepository: Repository<ScrapBoxEntity>,
  ) {}

  async createScrapBox(
    userId: number,
    dto: ScrapBoxRequestDto,
  ): Promise<ScrapBoxResponseDto> {
    try {
      const scrapBox = await this.scrapBoxRepository.insert({
        name: dto.name,
        description: dto.description,
        user: { id: userId },
      });
      return new ScrapBoxResponseDto(scrapBox.raw[0]);
    } catch (err) {
      throw new UnauthorizedException('token 만료 또는 잘못된 token');
    }
  }

  async getScrapBoxInfo(
    userId: number,
    scrapBoxId: number,
  ): Promise<ScrapBoxResponseWithNotices> {
    const scrapBox = await this.scrapBoxRepository.findOne({
      where: { id: scrapBoxId },
      relations: [
        'scraps',
        'scraps.notice',
        'scraps.notice.category',
        'scraps.notice.category.provider',
      ],
    });
    const scrapBoxes = await this.scrapBoxRepository.find({
      where: { user: { id: userId } },
      relations: ['scraps'],
    });
    if (!scrapBox)
      throw new NotFoundException('해당 ScrapBox가 존재하지 않습니다');
    if (scrapBox.userId !== userId)
      throw new ForbiddenException('권한이 없습니다');
    return new ScrapBoxResponseWithNotices(scrapBox, scrapBoxes);
  }

  async getScrapBoxes(
    userId: number,
    pageQuery: PageQuery,
  ): Promise<PageResponse<ScrapBoxResponseDto>> {
    const [records, total] = await this.scrapBoxRepository.findAndCount({
      where: { user: { id: userId } },
      take: pageQuery.pageSize,
      skip: (pageQuery.page - 1) * pageQuery.pageSize,
    });
    const dtos = records.map((scrapBox) => new ScrapBoxResponseDto(scrapBox));
    return new PageResponse<ScrapBoxResponseDto>(dtos, total, pageQuery);
  }

  async updateScrapBox(
    scrapBoxId: number,
    userId: number,
    dto: ScrapBoxRequestDto,
  ): Promise<ScrapBoxResponseDto> {
    const scrapBox = await this.scrapBoxRepository.findOne({
      where: { id: scrapBoxId },
      relations: [
        'scraps',
        'scraps.notice',
        'scraps.notice.category',
        'scraps.notice.category.provider',
      ],
    });
    if (!scrapBox)
      throw new NotFoundException('해당 ScrapBox가 존재하지 않습니다');
    if (scrapBox.userId !== userId)
      throw new ForbiddenException('권한이 없습니다');
    scrapBox.description = dto.description;
    scrapBox.name = dto.name;

    const saved = await this.scrapBoxRepository.save(scrapBox);
    return new ScrapBoxResponseDto(saved);
  }

  async deleteScrapBox(scrapBoxId: number, userId: number): Promise<void> {
    const scrapBox = await this.scrapBoxRepository.findOne({
      where: { id: scrapBoxId },
    });
    if (!scrapBox)
      throw new NotFoundException('해당 ScrapBox가 존재하지 않습니다');
    if (scrapBox.userId !== userId)
      throw new ForbiddenException('권한이 없습니다');
    await this.scrapBoxRepository.delete(scrapBoxId);
  }
}
