import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';
import { Order } from '.prisma/client';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('order_created')
  async handleOrderCreated(order: Order) {
    this.notificationsService.sendNotification(order);
  }

  @EventPattern('order_status_changed')
  async handleOrderStatusChanged(order: Order) {
    this.notificationsService.sendNotification(order);
  }
}
