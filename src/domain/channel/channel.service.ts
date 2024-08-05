import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { NotiByCategory } from './dtos/notification.dto';

@Injectable()
export class ChannelService {
  client = axios.create({
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
    baseURL: 'https://discord.com/api',
  });
  allChannelPath = '/channels/1222434492413644840/messages';
  kudogChannelPath = '/channels/1220053997201653841/messages';

  async sendMessageToAll(content: string) {
    if (content.length >= 2000) {
      const sliceIndex = content.lastIndexOf('\n', 2000);

      await this.client.post(this.allChannelPath, {
        content: content.slice(0, sliceIndex),
      });
      return this.sendMessageToAll(content.slice(sliceIndex + 1));
    }
    this.client.post(this.allChannelPath, { content });
  }

  async sendMessageToKudog(content: string) {
    if (content.length >= 2000) {
      const sliceIndex = content.lastIndexOf('\n', 2000);

      await this.client.post(this.kudogChannelPath, {
        content: content.slice(0, sliceIndex),
      });
      return this.sendMessageToKudog(content.slice(sliceIndex + 1));
    }
    this.client.post(this.kudogChannelPath, { content });
  }

  createMessageFromNotices(noticeInfos: NotiByCategory[]): string {
    const messages = [];
    for (const info of noticeInfos) {
      if (info.notices.length === 0) continue;
      messages.push(`${info.category}에 새로운 공지사항이 올라왔습니다.`);
      for (const notice of info.notices) {
        const url = notice.url.endsWith('=')
          ? notice.url.slice(0, notice.url.lastIndexOf('&'))
          : notice.url;
        messages.push(`- [${notice.title}](${url})`);
      }
    }
    return messages.join('\n');
  }

  createMessageFromNoticesWithOutURL(noticeInfos: NotiByCategory[]): string {
    const messages = [];
    for (const info of noticeInfos) {
      if (info.notices.length === 0) continue;
      messages.push(`${info.category}에 새로운 공지사항이 올라왔습니다.`);
      for (const notice of info.notices) {
        messages.push(`- [${notice.title}]`);
      }
    }
    messages.push('KUPID 공지사항은 앱에서 확인해주세요!');
    return messages.join('\n');
  }
}