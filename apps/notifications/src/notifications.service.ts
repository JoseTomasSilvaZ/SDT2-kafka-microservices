import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EnvService } from './env/env.service';
import { Order } from '.prisma/client';
EnvService;
@Injectable()
export class NotificationsService implements OnModuleInit {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientKafka,
    private readonly mailer: MailerService,
    private readonly env: EnvService,
  ) {}
  async onModuleInit() {
    await this.client.connect();
    console.log('Notifications service has been initialized.');
  }
  async sendNotification(order: Order) {
    try {
      await this.mailer.sendMail({
        to: order.email,
        from: this.env.get('NOTIFICATION_AUTH_USER'),
        subject: `✨ Order ${order.id} - Status changed!`,
        html: `<b>Order ${order.id}</b> has changed status to <b>${order.status}</b> <br/> at: ${new Date().toLocaleTimeString()}!`,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
