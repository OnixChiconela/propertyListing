import { Module } from '@nestjs/common';
import { ReservationController } from './controllers/reservation/reservation.controller';
import { ReservationService } from './services/reservation/reservation.service';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { ListingsService } from 'src/listings/services/listings/listings.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import { PrismaClient } from '@prisma/client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ListingsService,
    AuthService,
    UsersService,    
    PrismaClient
  ],
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
export class ReservationModule {}
