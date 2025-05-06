import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const expectedResponse = {
        user: {
          id: 1,
          email: userData.email,
          name: userData.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        access_token: 'mock-token',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(expectedResponse);

      const result = await controller.register(userData);
      expect(result).toEqual(expectedResponse);
      expect(authService.register).toHaveBeenCalledWith(userData);
    });

    it('should throw HttpException when registration fails', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const errorMessage = 'Email already exists';
      jest.spyOn(authService, 'register').mockRejectedValue(new Error(errorMessage));

      await expect(controller.register(userData)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResponse = {
        access_token: 'mock-token',
        user: {
          id: 1,
          email: credentials.email,
          name: 'Test User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(authService, 'login').mockResolvedValue(expectedResponse);

      const result = await controller.login(credentials);
      expect(result).toEqual(expectedResponse);
      expect(authService.login).toHaveBeenCalledWith(credentials);
    });

    it('should throw HttpException when login fails', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'wrong-password',
      };

      const errorMessage = 'Invalid credentials';
      jest.spyOn(authService, 'login').mockRejectedValue(new Error(errorMessage));

      await expect(controller.login(credentials)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.UNAUTHORIZED),
      );
    });
  });
}); 