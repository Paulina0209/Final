import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Configurar dotenv para cargar variables de entorno desde .env
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para solicitudes desde otros dominios (como el frontend)
  app.enableCors();

  // Usar puerto dinámico para despliegue o 3000 como valor por defecto en local
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
}

bootstrap();