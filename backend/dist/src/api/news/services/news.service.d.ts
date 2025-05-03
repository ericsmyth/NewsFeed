import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';
export declare class NewsService {
    private newsRepository;
    private readonly newsApiUrl;
    private readonly apiKey;
    constructor(newsRepository: Repository<News>);
    fetchTopHeadlines(country?: string, category?: string, sources?: string, pageSize?: number, page?: number): Promise<any>;
    searchNews(query: string, from?: string, to?: string, pageSize?: number, page?: number): Promise<any>;
    getAllSavedNews(): Promise<News[]>;
}
