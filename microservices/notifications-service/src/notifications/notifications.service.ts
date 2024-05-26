import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class NotificationsService implements OnModuleInit {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientKafka,
  ) {}
  async onModuleInit() {
    this.client.subscribeToResponseOf('unfinished_order');
    await this.client.connect();
    console.log('Notifications service has been initialized.');
  }
  sendNotification(data: Record<string, unknown>) {
    console.log('Sending notification', data);
  }
}
