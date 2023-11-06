import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Notice } from 'src/entities';
import { Repository } from 'typeorm';
import noticeFetcher from './fetch';

@Injectable()
export class FetchService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  private readonly logger = new Logger(FetchService.name);

  @Cron('0 0 18 * * *', { timeZone: 'Asia/Seoul' })
  async fetchNotices() {
    const categories = await this.categoryRepository.find({
      relations: ['provider'],
    });

    Promise.all(
      categories.map(async (category) => await this.fetchNotice(category)),
    );
  }

  async fetchNotice(category: Category) {
    const dto = {
      provider: category.provider.name,
      url: category.url,
      categoryId: category.id,
    };
    const dtos = await noticeFetcher(dto);
    Promise.all(
      dtos.map(async (data) => {
        await this.noticeRepository.insert({
          title: data.title,
          content: data.content,
          writer: data.writer,
          date: data.writtenDate,
          url: data.page.url,
          category,
        });
      }),
    );
  }
}
