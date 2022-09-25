import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/user/user.entities';
import { MongoRepository } from 'typeorm';

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
}
