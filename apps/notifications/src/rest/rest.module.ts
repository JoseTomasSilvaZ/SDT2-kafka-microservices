import { Module } from '@nestjs/common';
import { NotificationsRestController } from './rest.controller';
import { PrismaModule, PrismaService } from '@app/prisma';
import { NotificationsRestService } from './rest.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [NotificationsRestController],
  providers: [NotificationsRestService],
})
export class NotificationsRestModule {}
