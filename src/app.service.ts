import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `What do you want here? This's the devs space! "Tchau"!!!. ahaha brincadeiras folks`;
  }
}
