import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, KudogUser, Notice } from 'src/entities';
import { Repository } from 'typeorm';
import noticeFetcher from './fetch';
import { ChannelService } from 'src/channel/channel.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class FetchService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(KudogUser)
    private readonly kudogUserRepository: Repository<KudogUser>,
    private channelService: ChannelService,
    private mailService: MailService,
  ) {}
  private readonly logger = new Logger(FetchService.name);

  @Cron('0 0 18 * * *', { timeZone: 'Asia/Seoul' }) //매일 오후 6시에 올라온 공지사항을 가져온다는 것.
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
            console.log(
              category.provider.name + ' ' + category.name + '에서 에러 발생',
            );
          }
        }),
      )
    ).filter((d) => d !== undefined && d.notices.length > 0);
    if (data.length === 0) return;
    await this.channelService.sendMessage(data);
    try {
      await this.sendMail(data);
    } catch (e) {
      console.log(e);
    }
  }

  async sendMail(
    noticeData: {
      category: string;
      categoryId: number;
      notices: { title: string; url: string; content: string }[];
    }[],
  ) {
    const users = await this.kudogUserRepository.find({
      where: { subscribing: true },
      relations: ['mail', 'categoryPerUsers'],
    });
    await Promise.all(
      users.map(async (user) => {
        let html = '';
        const noticesToSend = noticeData.filter(
          (data) =>
            user.categoryPerUsers.filter(
              (categories) => categories.category_id == data.categoryId,
            ).length > 0,
        );
        const today = new Date().toISOString().slice(0, 10);
        html = html.concat(`<html><head></head><body>`);
        html =
          html.concat(`	<h2 style="width: 100%; margin: 0 auto; text-align: center;">${user.name}님을 위한 공지사항입니다.</h2>
	<div style="width: 95%; text-align: right; margin: 0 auto;">2023-02-12</div>
	<div style="width: 95%; margin: 0 auto;">`);
        noticesToSend.forEach((data) => {
          html = html.concat(
            `<h4 style="text-align: left;">${data.category}</h4>`,
          );
          html = html.concat(
            data.notices
              .map((notice) => {
                return `<p>${notice.content}</p>`;
              })
              .join('<hr style="height: 2px; width: 100%;">'),
          );
        });
        html = html.concat(`	</div>
</body>
</html>`);
        if (user.mail.subscriberEmail != 'admin')
          await this.mailService.sendMail(
            user.mail.subscriberEmail,
            `[KUDOG] ${user.name}님을 위한 ${today}의 공지사항`,
            html,
          );
      }),
    );
  }

  async fetchNotice(category: Category) {
    const dto = {
      provider: category.provider.name,
      url: category.url,
      categoryId: category.id,
    };
    const dtos = await noticeFetcher(dto);

    const datas = await Promise.all(
      dtos.map(async (data) => {
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
