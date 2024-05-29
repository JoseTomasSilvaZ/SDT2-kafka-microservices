import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsRestService } from './rest.service';

@Controller('/notifications')
export class NotificationsRestController {
  constructor(
    private readonly notificationsRestService: NotificationsRestService,
  ) {}

  @Get('/order/:id')
  async getOrder(@Param('id') id: number) {
    return await this.notificationsRestService.getOrder(id);
  }
}
