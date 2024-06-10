import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport'
import * as cookieParser from 'cookie-parser';
import { WebSocketServer } from "ws"
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

const wss = new WebSocketServer({ noServer: true }); // Use WebSocketServer corretamente
  wss.on('connection', (ws: WebSocket) => {
    ws.send('hello')
  })
  app.useWebSocketAdapter(new WsAdapter(wss))

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
