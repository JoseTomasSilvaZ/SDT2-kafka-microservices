import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';
EnvService;

@Module({
  imports: [ConfigModule],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
