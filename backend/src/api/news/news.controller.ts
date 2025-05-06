import { Controller, Get, Put, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get news articles' })
  @ApiResponse({ status: 200, description: 'Returns a list of news articles' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getNews() {
    try {
      return await this.newsService.getNews();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('preferences/:userId')
  @ApiOperation({ summary: 'Get user news preferences' })
  @ApiResponse({ status: 200, description: 'Returns user news preferences' })
  @ApiResponse({ status: 404, description: 'Preferences not found' })
  async getUserPreferences(@Param('userId') userId: number) {
    try {
      const preferences = await this.newsService.getUserPreferences(userId);
      if (!preferences || preferences.length === 0) {
        throw new HttpException('Preferences not found', HttpStatus.NOT_FOUND);
      }
      return preferences;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('preferences/:userId')
  @ApiOperation({ summary: 'Update user news preferences' })
  @ApiResponse({ status: 200, description: 'Preferences updated successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateUserPreferences(
    @Param('userId') userId: number,
    @Body() updateData: { categoryIds: number[] },
  ) {
    try {
      return await this.newsService.updateUserPreferences(userId, updateData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 