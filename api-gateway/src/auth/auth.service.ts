import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(@Inject('AUTH_MICROSERVICE') private client: ClientKafka) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client
        .send(
          'auth',
          // { login: 'ophen', id: 1, password: '1234' },
          [1,2,3,4,5,6,7,8,10]
        )
        .subscribe({
          next: (response) => {
            console.log(response);
            resolve(response);
          },
          error: (error) => {
            console.error(error);
            reject(error);
          },
        });
      // this.client.emit('auth', message);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('auth');
    await this.client.connect();
    Logger.log('Auth module connected to Kafka');
  }
}
