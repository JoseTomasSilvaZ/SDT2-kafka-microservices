import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';
import { Order } from '.prisma/client';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern([
    'order_created',
    'processing_order',
    'delivering_order',
    'finished_order',
  ])
  async handleOrderStatusUpdated(order: Order) {
    this.notificationsService.sendNotification(order);
  }
}
