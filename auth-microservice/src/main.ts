import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['0.0.0.0:29092'],
    },
      consumer: {
          groupId: 'auth-gateway',
        },
    }});
  await app.listen();
}
bootstrap();
