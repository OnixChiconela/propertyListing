import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites/favorites.service';
import { FavoritesController } from './controllers/rfavorites/favorites.controller';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [
    FavoritesService,
    AuthService,
    UsersService,
    PrismaClient,
  ],
  controllers: [FavoritesController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' }
      }),
      inject: [ConfigService]

    }),
  ]
})
export class FavoritesModule {}
