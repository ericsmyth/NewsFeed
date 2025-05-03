import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';

@Injectable()
export class NewsService {
  private readonly newsApiUrl = 'https://newsapi.org/v2';
  private readonly apiKey = process.env.NEWS_API_KEY;

  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async fetchTopHeadlines(
    country?: string,
    category?: string,
    sources?: string,
    pageSize: number = 20,
    page: number = 1,
  ) {
    try {
      const params = new URLSearchParams();
      
      // Add required parameters
      params.append('apiKey', this.apiKey || '');
      params.append('pageSize', pageSize.toString());
      params.append('page', page.toString());

      // NewsAPI doesn't allow mixing sources with country/category
      if (sources) {
        params.append('sources', sources);
      } else {
        if (country) params.append('country', country);
        if (category) params.append('category', category);
      }

      console.log('Fetching news with params:', params.toString()); // Debug log

      const response = await fetch(`${this.newsApiUrl}/top-headlines?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('NewsAPI Error:', errorData); // Debug log
        throw new Error(errorData.message || 'Failed to fetch news');
      }

      const data = await response.json();
      console.log('NewsAPI Response:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Error fetching news:', error); // Debug log
      throw new Error(`Failed to fetch news: ${error.message}`);
    }
  }

  async searchNews(
    query: string,
    from?: string,
    to?: string,
    pageSize: number = 20,
    page: number = 1,
  ) {
    try {
      const params = new URLSearchParams({
        q: query,
        pageSize: pageSize.toString(),
        page: page.toString(),
        apiKey: this.apiKey || '',
        sortBy: 'publishedAt'
      });

      if (from) params.append('from', from);
      if (to) params.append('to', to);

      const response = await fetch(`${this.newsApiUrl}/everything?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch news');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to search news: ${error.message}`);
    }
  }

  async getAllSavedNews() {
    return await this.newsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
} 