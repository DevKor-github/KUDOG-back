import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryPerUser, Notice, Scrap } from 'src/entities';
import { In, Repository } from 'typeorm';
import {
  NoticeListResponseDto,
  PagedNoticeListDto,
} from './dtos/NoticeListResponse.dto';
import { NoticeInfoResponseDto } from './dtos/NoticeInfoResponse.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    @InjectRepository(Scrap)
    private readonly scrapRepository: Repository<Scrap>,
    @InjectRepository(CategoryPerUser)
    private readonly categoryPerUserRepository: Repository<CategoryPerUser>,
  ) {}

  async getNoticesBySubscribedCategories(
    userId: number,
    page: number = 1,
  ): Promise<PagedNoticeListDto> {
    const subscribedCategories = await this.categoryPerUserRepository.find({
      where: { user_id: userId },
    });
    const [notices, total] = await this.noticeRepository.findAndCount({
      skip: (page - 1) * 10,
      take: 10,
      order: {
        date: 'DESC',
      },
      where: {
        category: {
          id: In(subscribedCategories.map((category) => category.category_id)),
        },
      },
    });
    const dtos: NoticeListResponseDto[] = notices.map((notice) => {
      return {
        id: notice.id,
        title: notice.title,
        date: notice.date,
        scrapped: false,
      };
    });
    return {
      notices: dtos,
      page: page,
      totalNotice: total,
      totalPage: Math.ceil(total / 10),
    };
  }

  async getNoticesByTime(userId: number, page: number = 1) {
    const scraps = await this.scrapRepository.find({
      where: { user: { id: userId } },
      relations: ['notice'],
    });

    const [notices, total] = await this.noticeRepository.findAndCount({
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

  async getNoticesByCategoryIdOrderByDate(
    userId: number,
    categoryId: number,
    page: number = 1,
  ) {
    const scraps = await this.scrapRepository.find({
      where: { user: { id: userId } },
      relations: ['notice'],
    });

    const [notices, total] = await this.noticeRepository.findAndCount({
      where: {
        category: { id: categoryId },
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
  async getNoticesByProviderIdOrderByDate(
    userId: number,
    providerId: number,
    page: number = 1,
  ) {
    const scraps = await this.scrapRepository.find({
      where: { user: { id: userId } },
      relations: ['notice'],
    });

    const [notices, total] = await this.noticeRepository.findAndCount({
      where: {
        category: { provider: { id: providerId } },
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

  async getScrappedNotices(userId: number, page: number = 1) {
    const [scraps, total] = await this.scrapRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['notice'],
      skip: (page - 1) * 10,
      take: 10,
      order: {
        notice: { date: 'DESC' },
      },
    });
    const dtos: NoticeListResponseDto[] = scraps.map((scrap) => {
      const { id, title, date } = scrap.notice;
      return {
        id,
        title,
        date,
        scrapped: true,
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

  async scrapNotice(userId: number, noticeId: number) {
    const entity = await this.scrapRepository.findOne({
      where: {
        user: { id: userId },
        notice: { id: noticeId },
      },
    });
    if (entity) {
      await this.scrapRepository.remove(entity);
      return false;
    }

    await this.scrapRepository.insert({
      user: { id: userId },
      notice: { id: noticeId },
    });
    return true;
  }

  async searchNotice(keyword: string, userId: number, page: number = 1) {
    const scraps = await this.scrapRepository.find({
      where: { user: { id: userId } },
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
