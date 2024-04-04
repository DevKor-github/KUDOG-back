import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice, Scrap } from 'src/entities';
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
}
