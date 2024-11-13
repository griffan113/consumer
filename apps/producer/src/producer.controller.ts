import { Controller, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { Client, ClientRMQ, Transport } from '@nestjs/microservices';

@Controller()
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Client({
    // transport: Transport.KAFKA,
    // options: {
    //   client: {
    //     brokers: ['localhost:9093'],
    //   },
    //   consumer: {
    //     groupId: 'ec-consumer',
    //   },
    // },
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'storage-sc',
      queueOptions: {
        durable: false,
      },
    },
  })
  // private client: ClientKafka;
  private client: ClientRMQ;

  // async onModuleInit() {
  //   this.client.subscribeToResponseOf('storage-ec');

  //   await this.client.connect();
  // }

  @Post()
  public async removeStorageItem() {
    // send - Enviar e aguardar a resposta
    // emit - Enviar apenas um evento e não aguardar resposta alguma

    return this.client.emit('storage-ec', {
      message: 'remove icegurts from storage',
    });
  }
}
