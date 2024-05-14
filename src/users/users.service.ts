import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KudogUser } from 'src/entities';
import { favoriteMajor } from 'src/entities/favoriteMajor.entity';
import { Repository } from 'typeorm';
import { modifyInfoRequestDto } from './dtos/userInfo.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(KudogUser)
    private readonly userRepository: Repository<KudogUser>,
    @InjectRepository(favoriteMajor)
    private readonly favoriteRepository: Repository<favoriteMajor>,
  ) {}
  saltOrRounds = 10;

  async getUserInfo(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    return {
      name: user.name,
      email: user.email,
    };
  }

  async modifyUserInfo(id: number, dto: modifyInfoRequestDto) {
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

  //즐겨찾기 기능
  async addFavoriteMajor(id: number, favoriteName: string): Promise<KudogUser> {
      const user = await this.userRepository.findOne({ where : {id}, relations: ['favorites']});
      if (!user) {
        throw new Error('User not found');
      }
  
      const favorite = new favoriteMajor();
      favorite.name = favoriteName;
      favorite.user = user;
  
      await this.favoriteRepository.save(favorite);
      return this.userRepository.findOne({ where : {id}, relations: ['favorites']});
    }
  
    async getUserFavorites(id: number): Promise<favoriteMajor[]> {
      const user = await this.userRepository.findOne({ where : {id}, relations: ['favorites']});
      if (!user) {
        throw new Error('User not found');
      }
  
      return user.favorites;
    }
  
    async removeFavoriteMajor(id: number, favoriteId: number): Promise<KudogUser> {
      const user = await this.userRepository.findOne({ where : {id}, relations: ['favorites']});
      if (!user) {
        throw new Error('User not found');
      }
  
      const index = user.favorites.findIndex((favorite) => favorite.id === favoriteId);
      if (index === -1) {
        throw new Error('Favorite not found');
      }
  
      user.favorites.splice(index, 1);
      await this.userRepository.save(user);
      return user;
    }
  }