import { NewsService } from '../services/news.service';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getTopHeadlines(country?: string, category?: string, sources?: string, pageSize?: number, page?: number): Promise<any>;
}
