import { Order, Status } from '.prisma/client';
import { PrismaService } from '@app/prisma';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProcessingService implements OnModuleInit {
  constructor(
    @Inject('PROCESSING_SERVICE') private readonly client: ClientKafka,
    private readonly prisma: PrismaService,
  ) {}
  async onModuleInit() {
    await this.client.connect();
    console.log('Processing service has been initialized.');
  }

  computeNewOrderStatus(order: Order) {
    const statusArray = Object.values(Status);
    const currentIndex = statusArray.indexOf(order.status);
    return statusArray[currentIndex + 1] as Status;
  }

  async processUpdateOrderStatus(order: Order) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newStatus = this.computeNewOrderStatus(order);
    const updatedOrder = await this.prisma.order.update({
      where: { id: order.id },
      data: { status: newStatus },
    });

    this.client.emit(`${newStatus.toLowerCase()}_order`, updatedOrder);
  }
}
