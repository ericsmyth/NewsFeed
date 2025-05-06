import { Test, TestingModule } from '@nestjs/testing';
import { NewsModule } from './news.module';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('NewsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [NewsModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide NewsController', () => {
    const controller = module.get<NewsController>(NewsController);
    expect(controller).toBeDefined();
  });

  it('should provide NewsService', () => {
    const service = module.get<NewsService>(NewsService);
    expect(service).toBeDefined();
  });

  it('should provide PrismaService', () => {
    const prismaService = module.get<PrismaService>(PrismaService);
    expect(prismaService).toBeDefined();
  });
}); 