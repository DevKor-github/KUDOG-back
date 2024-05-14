import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KudogUser } from 'src/entities';
import { favoriteMajor } from 'src/entities/favoriteMajor.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([KudogUser, favoriteMajor])],
})
export class UsersModule {}
