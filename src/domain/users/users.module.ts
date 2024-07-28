import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KudogUser, ProviderBookmark } from 'src/entities';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UserRepository],
  imports: [TypeOrmModule.forFeature([KudogUser, ProviderBookmark])],
})
export class UsersModule {}
