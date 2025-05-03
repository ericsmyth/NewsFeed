import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from '../services/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('top-headlines')
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

  @Get('search')
  async searchNews(
    @Query('q') query: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('pageSize') pageSize?: number,
    @Query('page') page?: number,
  ) {
    return await this.newsService.searchNews(query, from, to, pageSize, page);
  }

  @Get()
  async getAllNews() {
    return await this.newsService.getAllSavedNews();
  }
} 