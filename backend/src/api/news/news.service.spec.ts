import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('NewsService', () => {
  let service: NewsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: PrismaService,
          useValue: {
            userPreference: {
              findMany: jest.fn(),
              deleteMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getNews', () => {
    it('should return an empty array (placeholder for now)', async () => {
      const result = await service.getNews();
      expect(result).toEqual([]);
    });
  });

  describe('getUserPreferences', () => {
    it('should return user preferences', async () => {
      const userId = 1;
      const mockPreferences = [
        {
          id: 1,
          userId,
          categoryId: 1,
          category: {
            id: 1,
            name: 'Technology',
            description: 'Tech news',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prismaService.userPreference, 'findMany').mockResolvedValue(mockPreferences);

      const result = await service.getUserPreferences(userId);
      expect(result).toEqual(mockPreferences);
      expect(prismaService.userPreference.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: { category: true },
      });
    });
  });

  describe('updateUserPreferences', () => {
    it('should update user preferences successfully', async () => {
      const userId = 1;
      const updateData = {
        categoryIds: [1, 2],
      };

      const mockCreatedPreferences = [
        {
          id: 1,
          userId,
          categoryId: 1,
          category: {
            id: 1,
            name: 'Technology',
            description: 'Tech news',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId,
          categoryId: 2,
          category: {
            id: 2,
            name: 'Business',
            description: 'Business news',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prismaService.userPreference, 'deleteMany').mockResolvedValue({ count: 2 });
      jest.spyOn(prismaService.userPreference, 'create')
        .mockResolvedValueOnce(mockCreatedPreferences[0])
        .mockResolvedValueOnce(mockCreatedPreferences[1]);

      const result = await service.updateUserPreferences(userId, updateData);
      expect(result).toHaveLength(2);
      expect(prismaService.userPreference.deleteMany).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(prismaService.userPreference.create).toHaveBeenCalledTimes(2);
    });
  });
}); 