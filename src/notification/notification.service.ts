import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import { NotificationInfoResponseDto } from './dtos/noticiationInfoResponse.dto';
import { PageResponse } from 'src/interfaces/pageResponse';
import {
  CategoryPerSubscribeBoxEntity,
  NotificationTokenEntity,
  NotificationEntity,
  Notice,
} from 'src/entities';
import { PageQuery } from 'src/interfaces/pageQuery';
import { NotiByCategory } from 'src/channel/dtos/notification.dto';
import { NotificationFromCrawlerRequestDto } from './dtos/notificationFromCrawlerRequest.dto';
import { ChannelService } from 'src/channel/channel.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationTokenEntity)
    private readonly notificationTokenRepository: Repository<NotificationTokenEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationsRepository: Repository<NotificationEntity>,
    @InjectRepository(CategoryPerSubscribeBoxEntity)
    private readonly categoryMNRepository: Repository<CategoryPerSubscribeBoxEntity>,
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    private readonly channelService: ChannelService,
  ) {
    const firebaseKey = {
      type: process.env.FCM_TYPE,
      projectId: process.env.FCM_PROJECT_ID,
      privateKeyId: process.env.FCM_PRIVATE_KEY_ID,
      privateKey: process.env.FCM_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FCM_CLIENT_EMAIL,
      clientId: process.env.FCM_CLIENT_ID,
      authUri: process.env.FCM_AUTH_URI,
      tokenUri: process.env.FCM_TOKEN_URI,
      authProviderX509CertUrl: process.env.FCM_AUTH_CERT_URL,
      clientX509CertUrl: process.env.FCM_CLIENT_CERT_URL,
    };

    firebase.initializeApp({
      credential: firebase.credential.cert(firebaseKey),
    });
  }

  async sendPushOnNewNotices(noticeInfos: NotiByCategory[]) {
    Promise.all(
      noticeInfos.map(async (noticeInfo) => {
        const entities = await this.categoryMNRepository.find({
          where: { category: { id: noticeInfo.categoryId } },
          relations: ['subscribeBox'],
        });
        entities.map((entity) => {
          noticeInfo.notices.map(async (notice) => {
            const messageTitle = `구독함 ${entity.subscribeBox.name} ${noticeInfo.category}에 새로운 공지사항이 등록되었습니다.`;
            this.sendNotification(
              [entity.subscribeBox.userId],
              messageTitle,
              notice.title,
            );
          });
        });
      }),
    );
  }

  async getNotifications(
    userId: number,
    pageQuery: PageQuery,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    const [records, total] = await this.notificationsRepository.findAndCount({
      where: {
        userId: userId,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: (pageQuery.page - 1) * pageQuery.pageSize,
      take: pageQuery.pageSize,
    });
    const dtos = records.map(
      (record) => new NotificationInfoResponseDto(record),
    );
    return new PageResponse<NotificationInfoResponseDto>(
      dtos,
      total,
      pageQuery,
    );
  }
  async getNewNotifications(
    userId: number,
    pageQuery: PageQuery,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    const [records, total] = await this.notificationsRepository.findAndCount({
      where: {
        userId,
        isRead: false,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: (pageQuery.page - 1) * pageQuery.pageSize,
      take: pageQuery.pageSize,
    });
    const dtos = records.map(
      (record) => new NotificationInfoResponseDto(record),
    );

    this.notificationsRepository.save(
      records.map((record) => ({ isRead: true, ...record })),
    );

    return new PageResponse<NotificationInfoResponseDto>(
      dtos,
      total,
      pageQuery,
    );
  }

  async sendNotification(
    userIds: number[],
    title: string,
    body: string,
  ): Promise<void> {
    const tokens = await this.notificationTokenRepository.find({
      where: { user: { id: In(userIds) }, isActive: true },
    });
    const tokenList = tokens.map((token) => token.token);
    if (tokenList.length === 0) return;
    const newEntities = userIds.map((userId) =>
      this.notificationsRepository.create({
        userId,
        title,
        body,
      }),
    );
    await this.notificationsRepository.save(newEntities);
    const responses = await firebase.messaging().sendEachForMulticast({
      notification: {
        title,
        body,
      },
      tokens: tokenList,
    });
    if (responses.failureCount > 0) {
      Promise.all(
        responses.responses.map((response, index) => {
          if (response.success) return;
          if (response.error.code === 'messaging/invalid-registration-token') {
            return this.deleteToken(userIds[index], tokenList[index]);
          }
          if (
            response.error.code ===
            'messaging/registration-token-not-registered'
          ) {
            return this.deleteToken(userIds[index], tokenList[index]);
          }
          if (response.error.code === 'messaging/server-unavailable') {
            try {
              return firebase.messaging().send({
                notification: {
                  title,
                  body,
                },
                token: tokenList[index],
              });
            } catch (err) {
              throw new InternalServerErrorException(err);
            }
          }
          throw new InternalServerErrorException(response.error);
        }),
      );
    }
  }

  async registerToken(userId: number, token: string): Promise<void> {
    await this.notificationTokenRepository.insert({
      userId: userId,
      token,
    });
  }

  async deleteToken(userId: number, token: string): Promise<void> {
    await this.notificationTokenRepository.update(
      { userId: userId, token: token },
      { isActive: false },
    );
  }

  async getTokenStatus(userId: number, token: string): Promise<boolean> {
    const tokenInfo = await this.notificationTokenRepository.findOne({
      where: { userId, token: token, isActive: true },
    });
    return !!tokenInfo;
  }

  async sendNotificationFromCrawler(
    dto: NotificationFromCrawlerRequestDto,
  ): Promise<void> {
    const { ids } = dto;
    if (ids.length === 0) return;
    const entities = await this.noticeRepository.find({
      where: {
        id: In(ids),
      },
      relations: ['category'],
    });
    const data: NotiByCategory[] = [
      {
        categoryId: 23,
        category: 'KUPID 일반공지',
        notices: entities
          .filter((entity) => entity.category.id === 23)
          .map((entity) => ({
            title: entity.title,
            url: entity.url,
          })),
      },
      {
        categoryId: 23,
        category: 'KUPID 장학금공지',
        notices: entities
          .filter((entity) => entity.category.id === 24)
          .map((entity) => ({
            title: entity.title,
            url: entity.url,
          })),
      },
      {
        categoryId: 23,
        category: 'KUPID 학사일정',
        notices: entities
          .filter((entity) => entity.category.id === 25)
          .map((entity) => ({
            title: entity.title,
            url: entity.url,
          })),
      },
    ];

    const message =
      this.channelService.createMessageFromNoticesWithOutURL(data);
    await this.channelService.sendMessageToAll(message);
    await this.channelService.sendMessageToKudog(message);

    try {
      await this.sendPushOnNewNotices(data);
    } catch (err) {
      await this.channelService.sendMessageToKudog(err);
      throw new InternalServerErrorException(err);
    }
  }
}
