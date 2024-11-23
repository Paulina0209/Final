import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './register-user.dto';
import { LoginUserDto } from './login-user.dto';

@Injectable()
export class AuthService {
  private users = []; // Simulación de base de datos (temporal)

  constructor(private readonly jwtService: JwtService) {}

  // Registro de usuario
  async register(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;

    // Verificar si el usuario ya existe
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      throw new BadRequestException('El usuario ya está registrado');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const user = {
      id: Date.now(), // Genera un ID único (temporal)
      email,
      password: hashedPassword,
    };
    this.users.push(user);

    return {
      message: 'Usuario registrado exitosamente',
      user: { ...user, password: undefined }, // Excluir la contraseña en la respuesta
    };
  }

  // Inicio de sesión
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Buscar al usuario por correo electrónico
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar el token JWT
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Inicio de sesión exitoso',
      token,
    };
  }
}
