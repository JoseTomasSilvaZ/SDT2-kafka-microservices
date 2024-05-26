import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('order_status_changed')
  async handleOrderStatusChanged(data: Record<string, unknown>) {
    console.log('Order status changed:', data);
    this.notificationsService.sendNotification(data);
  }
}
