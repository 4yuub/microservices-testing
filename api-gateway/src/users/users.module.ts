import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'USERS_MICROSERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'users',
          brokers: ['localhost:29092'],
        },
        consumer: {
          groupId: 'users-gateway',
        }
      },
    },
  ]),],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
