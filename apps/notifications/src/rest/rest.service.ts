import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsRestService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrder(id: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
      });
      if (!order) {
        return { error: 'Order not found' };
      }
      return order;
    } catch (error) {
      console.log(error);
      return { error: 'Something went wrong' };
    }
  }
}
