import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { EnvService } from './env/env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    MailerModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        transport: {
          host: envService.get('NOTIFICATION_HOST'),
          port: envService.get('NOTIFICATION_PORT'),
          secure: true,
          auth: {
            user: envService.get('NOTIFICATION_AUTH_USER'),
            pass: envService.get('NOTIFICATION_AUTH_PASS'),
          },
        },
      }),
    }),
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9094'],
          },
          consumer: {
            groupId: 'notifications-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
