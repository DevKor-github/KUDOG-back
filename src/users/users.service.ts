import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KudogUser } from 'src/entities';
import { Repository } from 'typeorm';
import { ModifyInfoRequestDto, UserInfoResponseDto } from './dtos/userInfo.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(KudogUser)
    private readonly userRepository: Repository<KudogUser>,
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
    if (dto.sendTime) user.sendTime = dto.sendTime;
    await this.userRepository.save(user);
  }
}
