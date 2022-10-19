import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/user/user.entities';
import { MongoRepository } from 'typeorm';
import { AddUserDto } from '@/user/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  async createOrSave(user) {
    try {
      const res = await this.userRepository.save(user);
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * find user by username
   * @param username
   */
  async find(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (user) return user;
    else return null;
  }
  async addUser() {
    const aaa = await this.userRepository.save({
      username: 'admin',
      password: '123456',
    });
    if (aaa) {
      return true;
    }
  }
}
