import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ConsumerModule } from './consumer.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ConsumerModule,
    // transport layer
    {
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
    },
  );

  await app.listen();
}

bootstrap();
