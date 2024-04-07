//- [ ]  알림 조회 alc  알림 생성 (DB 저장) → 다희
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from 'src/entities/notification.entity';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { NotificationToken } from 'src/entities/notification-token.entity';
import { NotificationCreateDto } from './dtos/NotificationCreate.dto';

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, '..', '..', 'firebase-adminsdk.json'),
  ),
});

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationsRepo: Repository<Notifications>,
    @InjectRepository(NotificationToken)
    private readonly notificationTokenRepo: Repository<NotificationToken>,
  ) {}

  //알림 조회
  getNotifications = async (userId: number): Promise<any> => {
    try {
      // 현재 사용자의 ID를 조건으로 데이터베이스(notificationsRepo)에서 알림 조회
      const notifications = await this.notificationsRepo.find({
        where: { created_By: userId },
      });
      return notifications;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //알림 생성 및 DB 저장
  sendNotification = async (
    user: any,
    title: string,
    body: string,
  ): Promise<void> => {
    try {
      // 알림 생성
      const newNotification = new NotificationCreateDto();
      newNotification.title = title;
      newNotification.body = body;
      newNotification.status = 'ACTIVE';
      newNotification.createdBy = user.username;

      // 데이터베이스에 알림 저장
      const notification = await this.notificationsRepo.save(newNotification);

      // 알림 토큰 조회 및 푸시 알림 보내기 -> 푸시 알람 만들어지면 삭제 가능
      const notificationToken = await this.notificationTokenRepo.findOne({
        where: { user: { id: user.id }, status: 'ACTIVE' },
      });
      if (notificationToken) {
        await firebase
          .messaging()
          .send({
            notification: { title, body },
            token: notificationToken.notification_token,
            android: { priority: 'high' },
          })
          .catch((error: any) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
