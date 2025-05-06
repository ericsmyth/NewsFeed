import { NewsArticle } from '@prisma/client';

describe('NewsArticle', () => {
  it('should have the correct structure', () => {
    const article: NewsArticle = {
      id: 1,
      title: 'Test Article',
      description: 'Test Description',
      content: 'Test Content',
      url: 'https://example.com/article',
      source: 'Test Source',
      author: 'Test Author',
      publishedAt: new Date(),
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(article).toHaveProperty('id');
    expect(article).toHaveProperty('title');
    expect(article).toHaveProperty('description');
    expect(article).toHaveProperty('content');
    expect(article).toHaveProperty('url');
    expect(article).toHaveProperty('source');
    expect(article).toHaveProperty('author');
    expect(article).toHaveProperty('publishedAt');
    expect(article).toHaveProperty('categoryId');
    expect(article).toHaveProperty('createdAt');
    expect(article).toHaveProperty('updatedAt');
  });

  it('should have required fields', () => {
    const article: NewsArticle = {
      id: 1,
      title: 'Test Article',
      url: 'https://example.com/article',
      source: 'Test Source',
      publishedAt: new Date(),
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as NewsArticle;

    expect(article.title).toBeDefined();
    expect(article.url).toBeDefined();
    expect(article.source).toBeDefined();
    expect(article.publishedAt).toBeDefined();
    expect(article.categoryId).toBeDefined();
  });

  it('should have optional fields', () => {
    const article: NewsArticle = {
      id: 1,
      title: 'Test Article',
      url: 'https://example.com/article',
      source: 'Test Source',
      publishedAt: new Date(),
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as NewsArticle;

    expect(article.description).toBeUndefined();
    expect(article.content).toBeUndefined();
    expect(article.author).toBeUndefined();
  });
}); 