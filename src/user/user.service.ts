import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/user/user.entities';
import { MongoRepository } from 'typeorm';
import { BusinessException } from '@/common/exceptions/business.exception';
import { RedisInstance } from '@/common/redis';
import { AddUserDto } from '@/user/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  // async createOrSave(user) {
  //   try {
  //     const res = await this.userRepository.save(user);
  //     return res;
  //   } catch (e) {
  //     BusinessException.throwEmailAlreadyExistError();
  //   }
  // }
  async _createUser(user: AddUserDto) {
    const res = await this.userRepository.save(user);
    return res.email;
  }
  async find(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) return user;
    else return null;
  }
  /**
   * find user by username
   * @param username
   */
  async _findUser(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    console.log(user);
    if (!user) {
      return user;
    } else {
      BusinessException.throwEmailAlreadyExistError();
    }
  }
  // async addUser() {
  //   const aaa = await this.userRepository.save({
  //     username: 'admin',
  //     password: '123456',
  //   });
  //   if (aaa) {
  //     return true;
  //   }
  // }
  async registered(body) {
    const { password, email, verifyCode } = body;
    const redisCache = await RedisInstance.initRedis();
    const redisVerifyCode = await redisCache.get(email);
    if (redisVerifyCode && redisVerifyCode === verifyCode) {
      const existUser = await this._findUser(email);
      if (!existUser) {
        console.log(11);
        return await this._createUser({ password, email });
      }
    } else {
      BusinessException.throwEmailCodeError();
    }
  }
}
