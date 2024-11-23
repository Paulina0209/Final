import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity'; // Importa la entidad

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra la entidad para este módulo
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
