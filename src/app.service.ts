import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log("app running successfully")
    return `What do you want here? This's the devs space! "Tchau"!!!. ahaha brincadeiras folks`;
  }
}
