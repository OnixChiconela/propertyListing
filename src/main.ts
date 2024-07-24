import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport'
import cookieParser from "cookie-parser"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      name: "session-test",
      secret: 'test-secret',
      resave: false,
      saveUninitialized: false,

      cookie: {
        maxAge: 60000
      }
    })
  );

  //this part of code will be responsable to know how the credentials arrive here
  app.enableCors({
    credentials: true,
    origin: 'http://localhost/3010'
  })

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser())

  app.setGlobalPrefix('api')
  
  await app.listen(3010);
}
bootstrap();
