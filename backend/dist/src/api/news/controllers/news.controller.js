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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const news_service_1 = require("../services/news.service");
const swagger_1 = require("@nestjs/swagger");
let NewsController = class NewsController {
    newsService;
    constructor(newsService) {
        this.newsService = newsService;
    }
    async getTopHeadlines(country, category, sources, pageSize, page) {
        return await this.newsService.fetchTopHeadlines(country, category, sources, pageSize, page);
    }
};
exports.NewsController = NewsController;
__decorate([
    (0, common_1.Get)('top-headlines'),
    (0, swagger_1.ApiOperation)({ summary: 'Get top headlines' }),
    (0, swagger_1.ApiQuery)({ name: 'country', required: false, example: 'us' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, example: 'technology' }),
    (0, swagger_1.ApiQuery)({ name: 'sources', required: false, example: 'bbc-news' }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: 'number', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: 'number', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully retrieved top headlines' }),
    __param(0, (0, common_1.Query)('country')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('sources')),
    __param(3, (0, common_1.Query)('pageSize')),
    __param(4, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getTopHeadlines", null);
exports.NewsController = NewsController = __decorate([
    (0, swagger_1.ApiTags)('news'),
    (0, common_1.Controller)('news'),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
//# sourceMappingURL=news.controller.js.map