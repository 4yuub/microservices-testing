import { Controller, Get, OnApplicationShutdown } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController  {
  constructor(private readonly appService: AppService) {}
  @MessagePattern('auth')
  test(data: any) {
    // console.log(data.login);
    let array_of_numbers = data

    let sum : number = 0;
    for (let i = 0; i < array_of_numbers.length; i++) {
      sum += array_of_numbers[i];
    }
    // console.log(user);
    // return user;
    return sum;
  }
}
