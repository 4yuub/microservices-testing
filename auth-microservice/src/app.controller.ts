import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth')
  test(data: any) {
    // console.log(data.login);
    let array_of_numbers = data

    let sum = array_of_numbers.reduce(function(a : number, b  : number){
        return a + b;
    }, 0);
    // console.log(user);
    // return user;
    return sum;
  }
}
