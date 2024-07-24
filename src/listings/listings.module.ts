import { Module } from '@nestjs/common';
import { ListingsService } from './services/listings/listings.service';
import { ListingsController } from './controller/listings/listings.controller';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/utils/LocalStrategy';
import { UsersService } from 'src/users/services/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [
    ListingsService,
    AuthService,
    UsersService,    
    PrismaClient
  ],
  controllers: [ListingsController],
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
export class ListingsModule {}
