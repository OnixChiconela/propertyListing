import { Module } from '@nestjs/common';
import { ReservationController } from './controllers/reservation/reservation.controller';
import { ReservationService } from './services/reservation/reservation.service';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { ListingsService } from 'src/listings/services/listings/listings.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import { PrismaClient } from '@prisma/client';

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
    JwtModule.register({
      secret: 'nova-chave',
      signOptions: { expiresIn: '7d' }
    }),
  ]
})
export class ReservationModule {}
