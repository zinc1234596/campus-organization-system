import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/user/user.entities';
import { MongoRepository } from 'typeorm';
import { BusinessException } from '@/common/exceptions/business.exception';
import { RedisInstance } from '@/common/redis';
import { AddUserDto } from '@/user/user.dto';
import { sendVerifyCodeEmail } from '@/utils/email';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  /**
   *  注册用户集合逻辑
   * @param body
   */
  async registered(body) {
    const { email, password, verifyCode } = body;
    const redisVerifyCode = await this._ifRedisHasEmailVerifyCode(email);
    if (redisVerifyCode && redisVerifyCode === verifyCode) {
      const existUser = await this._findUser(email);
      if (!existUser) {
        return await this._createUser({ password, email });
      }
    } else {
      BusinessException.throwEmailCodeError();
    }
  }

  /**
   * 处理邮箱验证码 Controller
   * @param email
   */
  async handelVerifyCodeEmail(email: string) {
    await this._findUser(email);
    const ifRedisHasEmailVerifyCode = await this._ifRedisHasEmailVerifyCode(
      email,
    );
    if (ifRedisHasEmailVerifyCode) {
      BusinessException.throwEmailVerifyCodeAlreadySend();
    }
    const { res, code } = await sendVerifyCodeEmail(email);
    const redisCache = await RedisInstance.initRedis();
    await redisCache.setex(email, 180, code);
    return res;
  }

  /**
   * 往DB创建用户
   * @param user
   */
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
   * 查看DB是否存在该用户(通过email查询)
   * @param email
   */
  async _findUser(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      return user;
    } else {
      BusinessException.throwEmailAlreadyExistError();
    }
  }

  /**
   * 判断Redis是否存在邮件验证码
   * @param email
   */
  async _ifRedisHasEmailVerifyCode(email: string): Promise<string | null> {
    const redisCache = await RedisInstance.initRedis();
    return redisCache.get(email);
  }
}
