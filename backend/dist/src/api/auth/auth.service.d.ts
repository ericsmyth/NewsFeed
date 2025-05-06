import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(userData: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            email: string;
        };
        access_token: string;
    }>;
    login(credentials: {
        email: string;
        password: string;
    }): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            email: string;
        };
        access_token: string;
    }>;
}
