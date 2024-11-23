import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find(); 
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } }); 
  }

  create(createUserDto: any) {
    const user = this.userRepository.create(createUserDto); 
    return this.userRepository.save(user); 
  }

  update(id: number, updateUserDto: any) {
    return this.userRepository.update(id, updateUserDto); 
  }

  delete(id: number) {
    return this.userRepository.delete(id); 
  }
}
