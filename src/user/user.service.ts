import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/user/user.entities';
import { MongoRepository } from 'typeorm';
import { BusinessException } from '@/common/exceptions/business.exception';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  async createOrSave(user) {
    try {
      const res = await this.userRepository.save(user);
      return res;
    } catch (e) {
      BusinessException.throwUsernameAlreadyExistError();
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
