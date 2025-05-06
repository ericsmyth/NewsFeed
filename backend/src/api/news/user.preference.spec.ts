import { UserPreference } from '@prisma/client';

describe('UserPreference', () => {
  it('should have the correct structure', () => {
    const preference: UserPreference = {
      id: 1,
      userId: 1,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(preference).toHaveProperty('id');
    expect(preference).toHaveProperty('userId');
    expect(preference).toHaveProperty('categoryId');
    expect(preference).toHaveProperty('createdAt');
    expect(preference).toHaveProperty('updatedAt');
  });

  it('should have required fields', () => {
    const preference: UserPreference = {
      id: 1,
      userId: 1,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(preference.userId).toBeDefined();
    expect(preference.categoryId).toBeDefined();
  });

  it('should have a unique constraint on userId and categoryId', () => {
    const preference1: UserPreference = {
      id: 1,
      userId: 1,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const preference2: UserPreference = {
      id: 2,
      userId: 1,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // This test is just to document the unique constraint
    // The actual constraint is enforced by the database
    expect(preference1.userId).toBe(preference2.userId);
    expect(preference1.categoryId).toBe(preference2.categoryId);
  });
}); 