import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice, Scrap, ScrapBox } from 'src/entities';
import { Repository } from 'typeorm';
import {
  NoticeListResponseDto,
  PagedNoticeListDto,
} from './dtos/NoticeListResponse.dto';
import { NoticeInfoResponseDto } from './dtos/NoticeInfoResponse.dto';
import { NoticeFilterRequestDto } from './dtos/NoticeFilterRequest.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    @InjectRepository(Scrap)
    private readonly scrapRepository: Repository<Scrap>,
    @InjectRepository(ScrapBox)
    private readonly scrapBoxRepository: Repository<ScrapBox>,
  ) {}

  async getNoticeList(
    userId: number,
    filter: NoticeFilterRequestDto,
    page: number = 1,
    keyword?: string,
  ): Promise<PagedNoticeListDto> {
    const {
      categories,
      providers,
      start_date = '2020-01-01',
      end_date = '2040-01-01',
    } = filter;

    const categoryList = categories?.split(',') || [];
    const providerList = providers?.split(',') || [];

    const scrapBoxes = await this.scrapBoxRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['scraps'],
    });
    const queryBuilder = this.noticeRepository
      .createQueryBuilder('notice')
      .leftJoinAndSelect('notice.category', 'category')
      .leftJoinAndSelect('category.provider', 'provider')
      .leftJoinAndSelect('notice.scraps', 'scraps')
      .where('notice.date BETWEEN :start_date AND :end_date', {
        start_date,
        end_date,
      });

    if (categoryList.length > 0) {
      queryBuilder.andWhere('category.mappedCategory IN (:...categoryList)', {
        categoryList,
      });
    }

    if (providerList.length > 0) {
      queryBuilder.andWhere('provider.name IN (:...providerList)', {
        providerList,
      });
    }
    if (keyword) {
      queryBuilder.andWhere(
        '(notice.title like :keyword OR notice.content like :keyword OR notice.writer like :keyword)',
        {
          keyword: `%${keyword}%`,
        },
      );
    }

    const [notices, total] = await queryBuilder
      .orderBy('notice.date', 'DESC')
      .skip((page - 1) * 10)
      .take(10)
      .getManyAndCount();

    const dtos: NoticeListResponseDto[] = notices.map((notice) => {
      return NoticeListResponseDto.entityToDto(notice, scrapBoxes);
    });
    return {
      notices: dtos,
      page: page,
      totalNotice: total,
      totalPage: Math.ceil(total / 10),
    };
  }

  async getNoticeInfoById(
    id: number,
    userId: number,
  ): Promise<NoticeInfoResponseDto> {
    const notice = await this.noticeRepository.findOne({
      where: { id },
      relations: ['category', 'category.provider', 'scraps'],
    });
    notice.view += 1;
    await this.noticeRepository.save(notice);
    const scrapBoxes = await this.scrapBoxRepository.find({
      where: { user: { id: userId } },
      relations: ['scraps'],
    });

    return NoticeInfoResponseDto.entityToDto(notice, scrapBoxes);
  }

  async scrapNotice(
    userId: number,
    noticeId: number,
    scrapBoxId: number,
  ): Promise<boolean> {
    const scrapBox = await this.scrapBoxRepository.findOne({
      where: { id: scrapBoxId },
    });
    if (!scrapBox)
      throw new NotFoundException('해당 id의 scrapBox가 존재하지 않습니다.');
    if (scrapBox.userId !== userId)
      throw new ForbiddenException('userId와 scrapBox 소유자의 id가 다릅니다.');

    const scrap = await this.scrapRepository.findOne({
      where: {
        notice: { id: noticeId },
        scrapBox: { id: scrapBoxId },
      },
      relations: ['scrapBox'],
    });

    if (scrap) {
      await this.scrapRepository.remove(scrap);
      return false;
    }
    try {
      await this.scrapRepository.save({
        notice: { id: noticeId },
        scrapBox: { id: scrapBoxId },
      });
      return true;
    } catch (err) {
      throw new NotFoundException('해당 id의 notice가 존재하지 않습니다.');
    }
  }
}
