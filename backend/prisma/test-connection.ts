import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Try to count users as a simple test
    const userCount = await prisma.user.count();
    console.log('Database connection successful!');
    console.log(`Current number of users: ${userCount}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 