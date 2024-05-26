import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('unfinished_order')
  async handleOrderStatusChanged(data: Record<string, unknown>) {
    this.notificationsService.sendNotification(data);
  }
}
