import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { NotiByCategory } from './dtos/notification.dto';

@Injectable()
export class ChannelService {
  client = axios.create({
    headers: {
      'x-access-key': process.env.CHANNEL_API_KEY,
      'x-access-secret': process.env.CHANNEL_API_SECRET,
    },
    baseURL: 'https://api.channel.io/open',
  });
  botName = 'KUDOG 알리미';
  groupName = 'KUDOG';

  async sendMessage(messages: NotiByCategory[]) {
    Promise.all(
      messages.map(async (message) => {
        if (message.notices.length === 0) return;
        const titleMessage = {
          type: 'text',
          value:
            message.category +
            '에서 ' +
            (new Date().getMonth() + 1).toString().padStart(2, '0') +
            '-' +
            new Date().getDate().toString().padStart(2, '0') +
            '에 올라온 공지사항을 가져왔습니다.',
        };
        const bulletBlocks = message.notices.map((notice) => {
          const url = notice.url.endsWith('=')
            ? notice.url.slice(0, notice.url.lastIndexOf('&'))
            : notice.url;
          const title = notice.title.replace(/[&<>=,]/g, function (match) {
            switch (match) {
              case '<':
                return '&lt;';
              case '>':
                return '&gt;';
              default:
                return match;
            }
          });
          return {
            type: 'text',
            value: `<link type="url" value="${url}">${title}</link>`,
          };
        });
        const bulletMessage = {
          type: 'bullets',
          blocks: bulletBlocks,
        };
        const messageBlock = { blocks: [titleMessage, bulletMessage] };

        try {
          await this.client.post(
            `/v5/groups/@${this.groupName}/messages?botName=${this.botName}`,
            messageBlock,
          );
        } catch (err) {
          await this.client.post(
            `
            /v5/groups/@${this.groupName}/messages?botName=${this.botName}`,
            { plainText: '에러 발생. 로그를 확인해주세요' },
          );
        }
      }),
    );
  }
}
