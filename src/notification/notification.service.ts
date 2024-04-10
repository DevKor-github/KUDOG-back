import { Injectable } from '@nestjs/common';
import { NotificationInfoResponseDto } from './dtos/noticiationInfoResponse.dto';
import { PageResponse } from 'src/interfaces/pageResponse';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationToken, Notifications } from 'src/entities';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationToken)
    private readonly notificationTokenRepository: Repository<NotificationToken>,
    @InjectRepository(Notifications)
    private readonly notificationsRepository: Repository<Notifications>,
  ) {
    const firebase_key = {
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
      credential: firebase.credential.cert(firebase_key),
    });
  }

  async getNotifications(
    userId: number,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    return null;
  }
  async getNewNotifications(
    userId: number,
  ): Promise<PageResponse<NotificationInfoResponseDto>> {
    return null;
  }

  async sendNotification(
    userIds: number[],
    title: string,
    body: string,
  ): Promise<void> {}

  async registerToken(userId: number, token: string): Promise<void> {}

  async deleteToken(userId: number, token: string): Promise<void> {}

  async getTokenStatus(userId: number, token: string): Promise<boolean> {
    return null;
  }
}
