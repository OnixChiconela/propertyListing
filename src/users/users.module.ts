import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    UsersService,
    PrismaClient,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
