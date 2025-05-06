import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserPreference } from '@prisma/client';

type MockNewsService = {
  getNews: jest.Mock;
  getUserPreferences: jest.Mock;
  updateUserPreferences: jest.Mock;
};

describe('NewsController', () => {
  let controller: NewsController;
  let newsService: MockNewsService;

  beforeEach(async () => {
    const mockNewsService: MockNewsService = {
      getNews: jest.fn(),
      getUserPreferences: jest.fn(),
      updateUserPreferences: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        {
          provide: NewsService,
          useValue: mockNewsService,
        },
      ],
    }).compile();

    controller = module.get<NewsController>(NewsController);
    newsService = module.get(NewsService);
  });

  describe('getNews', () => {
    it('should return news articles', async () => {
      const mockNews = [
        {
          id: 1,
          title: 'Test News 1',
          description: 'Test Description 1',
          content: 'Test Content 1',
          url: 'https://example.com/1',
          source: 'Test Source 1',
          author: 'Test Author 1',
          publishedAt: new Date(),
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      newsService.getNews.mockResolvedValue(mockNews);

      const result = await controller.getNews();
      expect(result).toEqual(mockNews);
      expect(newsService.getNews).toHaveBeenCalled();
    });

    it('should throw HttpException when news fetching fails', async () => {
      const errorMessage = 'Failed to fetch news';
      newsService.getNews.mockRejectedValue(new Error(errorMessage));

      await expect(controller.getNews()).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR),
      );
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
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      newsService.getUserPreferences.mockResolvedValue(mockPreferences);

      const result = await controller.getUserPreferences(userId);
      expect(result).toEqual(mockPreferences);
      expect(newsService.getUserPreferences).toHaveBeenCalledWith(userId);
    });

    it('should throw HttpException when preferences not found', async () => {
      const userId = 1;
      newsService.getUserPreferences.mockResolvedValue([]);

      await expect(controller.getUserPreferences(userId)).rejects.toThrow(
        new HttpException('Preferences not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('updateUserPreferences', () => {
    it('should update user preferences successfully', async () => {
      const userId = 1;
      const updateData = {
        categoryIds: [1, 2],
      };

      const mockUpdatedPreferences = [
        {
          id: 1,
          userId,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      newsService.updateUserPreferences.mockResolvedValue(mockUpdatedPreferences);

      const result = await controller.updateUserPreferences(userId, updateData);
      expect(result).toEqual(mockUpdatedPreferences);
      expect(newsService.updateUserPreferences).toHaveBeenCalledWith(userId, updateData);
    });

    it('should throw HttpException when update fails', async () => {
      const userId = 1;
      const updateData = {
        categoryIds: [1, 2],
      };

      const errorMessage = 'Failed to update preferences';
      newsService.updateUserPreferences.mockRejectedValue(new Error(errorMessage));

      await expect(controller.updateUserPreferences(userId, updateData)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });
}); 