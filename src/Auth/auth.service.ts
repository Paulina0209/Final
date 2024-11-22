import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users = []; // Simulación de base de datos

  constructor(private readonly jwtService: JwtService) {}

  async register(registerUserDto: any) {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const user = { id: Date.now(), ...registerUserDto, password: hashedPassword };
    this.users.push(user);
    return { message: 'User registered', user: { ...user, password: undefined } };
  }

  async login(loginUserDto: any) {
    const user = this.users.find(u => u.email === loginUserDto.email);
    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }
}
