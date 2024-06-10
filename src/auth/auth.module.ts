import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { PrismaClient } from '@prisma/client';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './utils/LocalStrategy';
import { JwtStrategy } from './utils/jwt.strategy';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
      session: true
    }),
    JwtModule.register({
      secret: 'new-key',
      signOptions: { expiresIn: '7d' }
    }),
    
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UsersService,
    PrismaClient,
  ]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      (consumer: MiddlewareConsumer) => {
        consumer
         .apply(AuthMiddleware)
         .forRoutes({
          path: 'auth/profile',
          method: RequestMethod.GET
         })
      }
  }
}
