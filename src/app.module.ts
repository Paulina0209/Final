import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; 
import { UsersModule } from './users/users.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', 
      port: parseInt(process.env.DB_PORT) || 5432, 
      username: process.env.DB_USERNAME || 'postgres', 
      password: process.env.DB_PASSWORD || 'password', 
      database: process.env.DB_NAME || 'nest_db', 
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    UsersModule,
  ],
})
export class AppModule {}

