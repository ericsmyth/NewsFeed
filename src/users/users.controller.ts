import { Controller, Get, Post, Body, Param, Put, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findUserById(parseInt(id, 10));
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ) {
    return this.usersService.updateUser(parseInt(id, 10), updateUserDto);
  }

  @Post('api/auth/register')
  async register(
    @Body()
    data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
  ) {
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    // Check if user already exists
    const existingUser = await this.usersService.findUserByEmail(data.email);
    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }

    // Create new user
    const user = await this.usersService.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return {
      message: 'User registered successfully',
      user,
    };
  }
} 