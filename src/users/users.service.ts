import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = []; // Simulación de base de datos

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  create(createUserDto: any) {
    const user = { id: Date.now().toString(), ...createUserDto };
    this.users.push(user);
    return user;
  }

  update(id: string, updateUserDto: any) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  delete(id: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    return this.users.splice(index, 1);
  }
}
