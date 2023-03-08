import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@Inject('USERS_MICROSERVICE') public client: ClientKafka) {}
  

  create(createUserDto: CreateUserDto) {
    return new Promise((resolve, reject) => {
      this.client.send('createUser', createUserDto).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.client.send('findAllUsers', {}).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('findAllUsers');
    this.client.subscribeToResponseOf('createUser');
    this.client.subscribeToResponseOf('validateUser');
    await this.client.connect();
  }
}
