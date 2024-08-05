import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KudogUserEntity, ProviderBookmarkEntity } from 'src/entities';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UserRepository],
  imports: [
    TypeOrmModule.forFeature([KudogUserEntity, ProviderBookmarkEntity]),
  ],
})
export class UsersModule {}
