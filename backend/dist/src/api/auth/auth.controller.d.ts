import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userData: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            name: string | null;
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
            email: string;
            name: string | null;
        };
        access_token: string;
    }>;
}
