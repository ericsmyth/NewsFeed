import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const mockUser = {
        id: 1,
        email: userData.email,
        name: userData.name,
        password: await bcrypt.hash(userData.password, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const result = await service.register(userData);
      expect(result.user).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
      expect(result.access_token).toBe('mock-token');
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: userData.email },
      });
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: userData.email,
          name: userData.name,
        }),
      });
    });

    it('should throw HttpException when email already exists', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
        id: 1,
        email: userData.email,
        name: 'Existing User',
        password: await bcrypt.hash('existing-password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.register(userData)).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        email: credentials.email,
        name: 'Test User',
        password: await bcrypt.hash(credentials.password, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.login(credentials);
      expect(result.user).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
      expect(result.access_token).toBe('mock-token');
    });

    it('should throw HttpException when user not found', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(service.login(credentials)).rejects.toThrow(
        new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED),
      );
    });

    it('should throw HttpException when password is incorrect', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'wrong-password',
      };

      const mockUser = {
        id: 1,
        email: credentials.email,
        name: 'Test User',
        password: await bcrypt.hash('correct-password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      await expect(service.login(credentials)).rejects.toThrow(
        new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED),
      );
    });
  });
}); 