import { Controller, Get } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller()
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9093'],
      },
      consumer: {
        groupId: 'ec-consumer',
      },
    },
  })
  private client: ClientKafka;

  @Get()
  public async sendToStorage() {
    // send - Enviar e aguardar a resposta
    // emit - Enviar apenas um evento e não aguardar resposta alguma

    return this.client.emit('storage-ec', {
      message: 'remove ice cream from storage',
    });
  }
}
