import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity, Notice } from 'src/entities';
import { Repository } from 'typeorm';
import noticeFetcher from './fetch';
import { ChannelService } from 'src/channel/channel.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class FetchService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly channelService: ChannelService,
    private readonly notificationService: NotificationService,
  ) {}
  private readonly logger = new Logger(FetchService.name);

  @Cron(CronExpression.EVERY_10_MINUTES, { timeZone: 'Asia/Seoul' })
  async fetchNotices() {
    const categories = await this.categoryRepository.find({
      relations: ['provider'],
    });

    const data = (
      await Promise.all(
        categories.map(async (category) => {
          try {
            const titleUrlData = await this.fetchNotice(category);

            return {
              category: category.provider.name + ' ' + category.name,
              notices: titleUrlData,
              categoryId: category.id,
            };
          } catch (e) {
            this.channelService.sendMessageToKudog(
              category.provider.name + ' ' + category.name + '에서 에러 발생',
            );
            this.channelService.sendMessageToKudog(e.toString());
          }
        }),
      )
    ).filter((d) => d !== undefined && d.notices.length > 0);
    if (data.length === 0) return;

    const message = this.channelService.createMessageFromNotices(data);
    await this.channelService.sendMessageToAll(message);
    await this.channelService.sendMessageToKudog(message);

    try {
      await this.notificationService.sendPushOnNewNotices(data);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async fetchNotice(category: CategoryEntity) {
    const dto = {
      provider: category.provider.name,
      url: category.url,
      categoryId: category.id,
    };
    const dtos = await noticeFetcher(dto);
    if (dtos.length === 0) return [];
    const dataInDb = await this.noticeRepository.find({
      where: {
        category: { id: category.id },
        date: dtos[0].writtenDate,
      },
    });
    const filteredDtos = dtos.filter(
      (dto) => !dataInDb.some((data) => data.title === dto.title),
    );
    const datas = await Promise.all(
      filteredDtos.map(async (data) => {
        await this.noticeRepository.insert({
          title: data.title,
          content: data.content,
          writer: data.writer,
          date: data.writtenDate,
          url: data.page.url,
          category,
        });

        return { title: data.title, url: data.page.url, content: data.content };
      }),
    );
    return datas;
  }
}
