import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Obtiene el token del header
      ignoreExpiration: false, // Rechaza tokens expirados
      secretOrKey: configService.get<string>('JWT_SECRET'), // Obtiene la clave secreta del .env
    });
  }

  async validate(payload: any) {
    // Aquí puedes incluir lógica adicional para validar el usuario
    return { id: payload.id, email: payload.email }; // Devuelve los datos que quieres incluir en el request
  }
}
