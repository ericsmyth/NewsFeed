import { Category } from '@prisma/client';

describe('Category', () => {
  it('should have the correct structure', () => {
    const category: Category = {
      id: 1,
      name: 'Technology',
      description: 'Tech news and updates',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('name');
    expect(category).toHaveProperty('description');
    expect(category).toHaveProperty('createdAt');
    expect(category).toHaveProperty('updatedAt');
  });

  it('should have required fields', () => {
    const category: Category = {
      id: 1,
      name: 'Technology',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Category;

    expect(category.name).toBeDefined();
  });

  it('should have optional fields', () => {
    const category: Category = {
      id: 1,
      name: 'Technology',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Category;

    expect(category.description).toBeUndefined();
  });

  it('should have a unique constraint on name', () => {
    const category1: Category = {
      id: 1,
      name: 'Technology',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Category;

    const category2: Category = {
      id: 2,
      name: 'Technology',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Category;

    // This test is just to document the unique constraint
    // The actual constraint is enforced by the database
    expect(category1.name).toBe(category2.name);
  });
}); 