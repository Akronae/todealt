import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

export type EnvKey = 'PORT' | 'MONGO_URI' | 'JWT_SECRET';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get(key: EnvKey) {
    return this.nestConfigService.get(key);
  }

  getOrThrow(key: EnvKey) {
    return this.nestConfigService.getOrThrow(key);
  }
}
