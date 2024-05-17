import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KudogUser, SubscribeBoxEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { ModifyInfoRequestDto, UserInfoResponseDto } from './dtos/userInfo.dto';
import { hash } from 'bcrypt';
import { SendTimeFilterRequestDto } from './dtos/sendTimeFilterRequest.dto';
import { FeedbackDto } from './dtos/FeedbackFilterRequest.dto';
import { ChannelService } from 'src/channel/channel.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(KudogUser)
    private readonly userRepository: Repository<KudogUser>,
    @InjectRepository(SubscribeBoxEntity)
    private readonly subScribeBoxRepository: Repository<SubscribeBoxEntity>,
    private readonly channelService:ChannelService
  ) {}
  saltOrRounds = 10;

  async getUserInfo(id: number): Promise<UserInfoResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    return new UserInfoResponseDto(user);
  }

  async modifyUserInfo(id: number, dto: ModifyInfoRequestDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    if (dto.email) {
      user.email = dto.email;
    }
    if (dto.name) user.name = dto.name;
    if (dto.password) {
      const passwordHash = await hash(dto.password, this.saltOrRounds);
      user.passwordHash = passwordHash;
    }
    await this.userRepository.save(user);
  }
  async modifyTimeInfo(
    userId: number,
    dto: SendTimeFilterRequestDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`존재하지 않는 유저입니다.`);
    }

    await this.subScribeBoxRepository.update(
      { user: { id: userId } },
      { sendTime: dto.sendTime },
    );
  }
  async sendFeedback(dto: FeedbackDto): Promise<void> {
    const message = `새로운 피드백이 들어왔습니다: ${dto.feedback}`;
    await this.channelService.sendMessageToKudog(message);
  }
}
