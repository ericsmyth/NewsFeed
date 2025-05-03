import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from './prisma/prisma.service';
import { NewsModule } from './api/news/news.module';
import { AuthModule } from './api/auth/auth.module';
import { News } from './api/news/entities/news.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'news.db',
      entities: [News],
      synchronize: true, // Be careful with this in production
    }),
    NewsModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {} 