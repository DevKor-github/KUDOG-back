import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { KudogUserEntity, ProviderBookmarkEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { ModifyInfoRequestDto, UserInfoResponseDto } from './dtos/userInfo.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(KudogUserEntity)
    private readonly userRepository: Repository<KudogUserEntity>,
    @InjectRepository(ProviderBookmarkEntity)
    private readonly ProviderBookmarkEntityRepository: Repository<ProviderBookmarkEntity>,
  ) {}
  saltOrRounds = 10;

  async getUserInfo(id: number): Promise<UserInfoResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [
        'ProviderBookmarkEntitys',
        'ProviderBookmarkEntitys.provider',
      ],
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

    if (dto.ProviderBookmarkEntitys) {
      await this.ProviderBookmarkEntityRepository.delete({
        user: { id },
      });
      const ProviderBookmarkEntitys = dto.ProviderBookmarkEntitys.map(
        (providerId) =>
          this.ProviderBookmarkEntityRepository.create({
            user: { id },
            provider: { id: providerId },
          }),
      );
      await this.ProviderBookmarkEntityRepository.insert(
        ProviderBookmarkEntitys,
      );
    }
    await this.userRepository.save(user);
  }
}
