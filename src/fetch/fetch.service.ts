import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Notice } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FetchService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  private readonly logger = new Logger(FetchService.name);

  @Cron('0 12 1 * * *', { timeZone: 'Asia/Seoul' })
  async fetchNotices() {
    const categories = await this.categoryRepository.find();
    console.log(categories);
    //Promise.all(
    //  categories.map(async (category) => await this.fetchNotice(category)),
    //);
  }

  async fetchNotice(category: Category) {}
}
