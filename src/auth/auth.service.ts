import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface TokenUser {
  id: number;
  email: string;
  name: string | null;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: TokenUser) {
    const payload = { 
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    
    return this.jwtService.sign(payload);
  }
} 