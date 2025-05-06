"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let NewsService = class NewsService {
    prisma;
    newsApiUrl = 'https://newsapi.org/v2';
    apiKey = process.env.NEWS_API_KEY?.replace(/['"]/g, '');
    constructor(prisma) {
        this.prisma = prisma;
    }
    async fetchTopHeadlines(country, category, sources, pageSize = 20, page = 1) {
        try {
            if (!this.apiKey) {
                throw new Error('NEWS_API_KEY environment variable is not set');
            }
            const params = new URLSearchParams();
            params.append('apiKey', this.apiKey);
            params.append('pageSize', pageSize.toString());
            params.append('page', page.toString());
            if (sources) {
                params.append('sources', sources);
            }
            else {
                if (country)
                    params.append('country', country);
                if (category)
                    params.append('category', category);
            }
            console.log('Fetching news with params:', params.toString());
            const response = await fetch(`${this.newsApiUrl}/top-headlines?${params.toString()}`);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('NewsAPI Error:', errorData);
                throw new Error(errorData.message || 'Failed to fetch news');
            }
            const data = await response.json();
            console.log('NewsAPI Response:', data);
            return data;
        }
        catch (error) {
            console.error('Error fetching news:', error);
            throw new Error(`Failed to fetch news: ${error.message}`);
        }
    }
    async searchNews(query, from, to, pageSize = 20, page = 1) {
        try {
            if (!this.apiKey) {
                throw new Error('NEWS_API_KEY environment variable is not set');
            }
            const params = new URLSearchParams({
                q: query,
                pageSize: pageSize.toString(),
                page: page.toString(),
                apiKey: this.apiKey,
                sortBy: 'publishedAt'
            });
            if (from)
                params.append('from', from);
            if (to)
                params.append('to', to);
            const response = await fetch(`${this.newsApiUrl}/everything?${params.toString()}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch news');
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(`Failed to search news: ${error.message}`);
        }
    }
    async getAllSavedNews() {
        return await this.prisma.newsArticle.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NewsService);
//# sourceMappingURL=news.service.js.map