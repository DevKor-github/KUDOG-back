import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import { NotificationInfoResponseDto } from './dtos/noticiationInfoResponse.dto';
import { PageResponse } from 'src/interfaces/pageResponse';
import { NotificationToken, Notifications } from 'src/entities';
import { PageQuery } from 'src/interfaces/pageQuery';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationToken)
    private readonly notificationTokenRepository: Repository<NotificationToken>,
    @InjectRepository(Notifications)
    private readonly notificationsRepository: Repository<Notifications>,
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
      pageQuery.page,
      pageQuery.pageSize,
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
      pageQuery.page,
      pageQuery.pageSize,
    );
  }

  async sendNotification(
    userIds: number[],
    title: string,
    body: string,
  ): Promise<void> {
    const tokens = await this.notificationTokenRepository.find({
      where: { userId: In(userIds), isActive: true },
    });
    const tokenList = tokens.map((token) => token.token);

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
}
