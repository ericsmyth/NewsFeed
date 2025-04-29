"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        const userCount = await prisma.user.count();
        console.log('Database connection successful!');
        console.log(`Current number of users: ${userCount}`);
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=test-connection.js.map