import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly appService: ConsumerService) {}

  @EventPattern('storage-ec')
  public async getStorage(@Payload() message) {
    console.log('Message received', message);
  }
}
