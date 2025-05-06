import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async getNews() {
    // TODO: Implement news fetching from external API
    return [];
  }

  async getUserPreferences(userId: number) {
    return this.prisma.userPreference.findMany({
      where: { userId },
      include: {
        category: true,
      },
    });
  }

  async updateUserPreferences(
    userId: number,
    updateData: { categoryIds: number[] },
  ) {
    // First, delete existing preferences
    await this.prisma.userPreference.deleteMany({
      where: { userId },
    });

    // Then create new preferences
    return Promise.all(
      updateData.categoryIds.map((categoryId) =>
        this.prisma.userPreference.create({
          data: {
            userId,
            categoryId,
          },
          include: {
            category: true,
          },
        }),
      ),
    );
  }
} 