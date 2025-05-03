import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('top-headlines')
  @ApiOperation({ summary: 'Get top headlines' })
  @ApiQuery({ name: 'country', required: false, example: 'us' })
  @ApiQuery({ name: 'category', required: false, example: 'technology' })
  @ApiQuery({ name: 'sources', required: false, example: 'bbc-news' })
  @ApiQuery({ name: 'pageSize', required: false, type: 'number', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: 'number', example: 1 })
  @ApiResponse({ status: 200, description: 'Successfully retrieved top headlines' })
  async getTopHeadlines(
    @Query('country') country?: string,
    @Query('category') category?: string,
    @Query('sources') sources?: string,
    @Query('pageSize') pageSize?: number,
    @Query('page') page?: number,
  ) {
    return await this.newsService.fetchTopHeadlines(
      country,
      category,
      sources,
      pageSize,
      page,
    );
  }
} 