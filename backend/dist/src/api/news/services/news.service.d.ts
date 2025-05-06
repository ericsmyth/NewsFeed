import { PrismaService } from '../../../prisma/prisma.service';
export declare class NewsService {
    private prisma;
    private readonly newsApiUrl;
    private readonly apiKey;
    constructor(prisma: PrismaService);
    fetchTopHeadlines(country?: string, category?: string, sources?: string, pageSize?: number, page?: number): Promise<any>;
    searchNews(query: string, from?: string, to?: string, pageSize?: number, page?: number): Promise<any>;
    getAllSavedNews(): Promise<{
        publishedAt: Date;
        id: number;
        title: string;
        description: string | null;
        content: string | null;
        url: string;
        source: string;
        author: string | null;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
