import { Module } from '@nestjs/common';
import { NotificationsRestController } from './rest.controller';
import { PrismaModule, PrismaService } from '@app/prisma';
import { NotificationsRestService } from './rest.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from '../notifications.module';

@Module({
  imports: [
    NotificationsModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [NotificationsRestController],
  providers: [NotificationsRestService],
})
export class NotificationsRestModule {}
