import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KudogUser, Mail } from 'src/entities';
import { Repository } from 'typeorm';
import { modifyInfoRequestDto } from './dtos/userInfo.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(KudogUser)
    private readonly userRepository: Repository<KudogUser>,
    @InjectRepository(Mail)
    private readonly mailRepository: Repository<Mail>,
  ) {}
  saltOrRounds = 10;

  async getUserInfo(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['mail'],
    });
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    return {
      name: user.name,
      studentId: user.studentId,
      grade: user.grade,
      major: user.major,
      subscriberEmail: user.mail.subscriberEmail,
      portalEmail: user.mail.portalEmail,
    };
  }

  async modifyUserInfo(id: number, dto: modifyInfoRequestDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['mail'],
    });
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    if (dto.subscriberEmail) {
      user.mail.subscriberEmail = dto.subscriberEmail;
      await this.mailRepository.save(user.mail);
    }
    if (dto.name) user.name = dto.name;
    if (dto.studentId) user.studentId = dto.studentId;
    if (dto.grade) user.grade = dto.grade;
    if (dto.major) user.major = dto.major;
    if (dto.password) {
      const passwordHash = await hash(dto.password, this.saltOrRounds);
      user.passwordHash = passwordHash;
    }
    await this.userRepository.save(user);
  }
}
