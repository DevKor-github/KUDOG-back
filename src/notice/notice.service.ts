import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice, Scrap, ScrapBox } from 'src/entities';
import { Between, In, Repository } from 'typeorm';
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

  async getNoticesByFilterOrderByDate(
    userId: number,
    filter: NoticeFilterRequestDto,
    page: number = 1,
  ): Promise<PagedNoticeListDto> {
    const {
      categories,
      providers,
      start_date = '2020-01-01',
      end_date = '2040-01-01',
    } = filter;
    const categoryList = categories?.split(',') || [];
    const providerList = providers?.split(',') || [];

    const scraps = await this.scrapRepository.find({
      where: {
        scrapBox: {
          user: { id: userId },
        },
      },
      relations: ['notice'],
    });

    const [notices, total] = await this.noticeRepository.findAndCount({
      where: {
        date: Between(start_date, end_date),
        category: {
          mappedCategory: categoryList.length > 0 ? In(categoryList) : null,
          provider: {
            name: providerList.length > 0 ? In(providerList) : null,
          },
        },
      },
      skip: (page - 1) * 10,
      take: 10,
      order: {
        date: 'DESC',
      },
    });

    const dtos: NoticeListResponseDto[] = notices.map((notice) => {
      const { id, title, date } = notice;
      return {
        id,
        title,
        date,
        scrapped: scraps.some((scrap) => scrap.notice.id === id),
      };
    });
    return {
      notices: dtos,
      page: page,
      totalNotice: total,
      totalPage: Math.ceil(total / 10),
    };
  }

  async getNoticeInfoById(id: number) {
    const notice = await this.noticeRepository.findOne({
      where: { id },
      relations: ['category', 'category.provider'],
    });
    notice.view += 1;
    await this.noticeRepository.save(notice);

    const dto: NoticeInfoResponseDto = {
      id: notice.id,
      title: notice.title,
      content: notice.content,
      date: notice.date,
      view: notice.view,
      url: notice.url,
      scrapped: false,
      writer: notice.writer,
      scrapCount: 0,
      category: notice.category.name,
      provider: notice.category.provider.name,
    };
    return dto;
  }

  async searchNotice(keyword: string, userId: number, page: number = 1) {
    const scraps = await this.scrapRepository.find({
      where: {
        scrapBox: {
          user: { id: userId },
        },
      },
      relations: ['notice'],
    });

    const [notices, total] = await this.noticeRepository
      .createQueryBuilder('notice')
      .where('notice.title like :keyword', { keyword: `%${keyword}%` })
      .orWhere('notice.content like :keyword', { keyword: `%${keyword}%` })
      .orWhere('notice.writer like :keyword', { keyword: `%${keyword}%` })
      .orderBy('notice.date', 'DESC')
      .skip((page - 1) * 10)
      .take(10)
      .getManyAndCount();

    const dtos: NoticeListResponseDto[] = notices.map((notice) => {
      const { id, title, date } = notice;
      return {
        id,
        title,
        date,
        scrapped: scraps.some((scrap) => scrap.notice.id === id),
      };
    });
    return {
      notices: dtos,
      page: page,
      totalNotice: total,
      totalPage: Math.ceil(total / 10),
    };
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
