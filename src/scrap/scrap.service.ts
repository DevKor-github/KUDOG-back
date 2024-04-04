import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScrapBox } from 'src/entities';
import { Repository } from 'typeorm';
import { ScrapBoxResponseDto } from './dtos/scrapBoxResponse.dto';
import { ScrapBoxRequestDto } from './dtos/scrapBoxRequest.dto';
import { ScrapBoxResponseWithNotices } from './dtos/scrapBoxResponseWithNotices.dto';

@Injectable()
export class ScrapService {
  constructor(
    @InjectRepository(ScrapBox)
    private readonly scrapBoxRepository: Repository<ScrapBox>,
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
      return ScrapBoxResponseDto.entityToDto(scrapBox.raw[0]);
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
      relations: ['scraps', 'scraps.notice'],
    });
    const scrapBoxes = await this.scrapBoxRepository.find({
      where: { user: { id: userId } },
      relations: ['scraps'],
    });
    if (!scrapBox)
      throw new NotFoundException('해당 ScrapBox가 존재하지 않습니다');
    if (scrapBox.userId !== userId)
      throw new ForbiddenException('권한이 없습니다');
    return ScrapBoxResponseWithNotices.toDto(scrapBox, scrapBoxes);
  }

  async getScrapBoxes(userId: number): Promise<ScrapBoxResponseDto[]> {
    const scrapBoxes = await this.scrapBoxRepository.find({
      where: { user: { id: userId } },
    });
    return scrapBoxes.map((scrapBox) => {
      return ScrapBoxResponseDto.entityToDto(scrapBox);
    });
  }

  async updateScrapBox(
    scrapBoxId: number,
    userId: number,
    dto: ScrapBoxRequestDto,
  ): Promise<ScrapBoxResponseDto> {
    const scrapBox = await this.scrapBoxRepository.findOne({
      where: { id: scrapBoxId },
      relations: ['scraps', 'scraps.notice'],
    });
    if (!scrapBox)
      throw new NotFoundException('해당 ScrapBox가 존재하지 않습니다');
    if (scrapBox.userId !== userId)
      throw new ForbiddenException('권한이 없습니다');
    scrapBox.description = dto.description;
    scrapBox.name = dto.name;

    const saved = await this.scrapBoxRepository.save(scrapBox);
    return ScrapBoxResponseDto.entityToDto(saved);
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
