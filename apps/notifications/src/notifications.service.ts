import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EnvService } from './env/env.service';
EnvService;
@Injectable()
export class NotificationsService implements OnModuleInit {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientKafka,
    private readonly mailer: MailerService,
    private readonly env: EnvService,
  ) {}
  async onModuleInit() {
    this.client.subscribeToResponseOf('unfinished_order');
    await this.client.connect();
    console.log('Notifications service has been initialized.');
  }
  async sendNotification(data: Record<string, unknown>) {
    console.log('Sending notification...:', data);
    console.log(this.env.get('NOTIFICATION_AUTH_USER'));
    try {
      await this.mailer.sendMail({
        to: 'josetomassilvaz@gmail.com',
        from: this.env.get('NOTIFICATION_AUTH_USER'),
        subject: '✨ Order status changed!',
        html: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  }
}
