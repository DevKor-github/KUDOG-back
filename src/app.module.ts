import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*
dotenv.config();

const dataSource = new typeorm.DataSource({
  type: "postgres", //어떤 DB를 사용하는지 설정.
  host: (process.env.DB_HOST as string) || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: (process.env.DB_USER as string) || "postgres",
  password: "5334" || "postgres",
  database: (process.env.DB_NAME as string) || "postgres",*/
