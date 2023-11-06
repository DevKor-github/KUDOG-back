import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Notice } from 'src/entities';
import { Repository } from 'typeorm';
import { NoticeListResponseDto } from './dtos/NoticeListResponse.dto';
import { NoticeInfoResponseDto } from './dtos/NoticeInfoResponse.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getNoticesByTime(page: number = 1) {
    const notices = await this.noticeRepository.find({
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
        scrapped: false,
      };
    });
    return dtos;
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
}
