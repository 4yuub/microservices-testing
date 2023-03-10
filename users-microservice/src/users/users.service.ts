import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  async validateUser(username: string, password: string) {
    const user = await this.usersRepository.findOne({
        where: {username}
    });
    if (!user || user.password !== password) {
      return null;
    }
    return user;
  }
  
  async create(createUserDto: CreateUserDto) {
    try
    {
      await this.usersRepository.save(createUserDto);
      return createUserDto;
    }
    catch (e)
    {
      return e;
    }
  }

  async findAll() {
    return this.usersRepository.find();
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
}
