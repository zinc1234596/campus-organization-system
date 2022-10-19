import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { User } from '@/user/user.entities';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  /**
   * 校验username password
   * @param username
   * @param password
   */
  async validate(username: string, password: string): Promise<User> {
    const user = await this.userService.find(username);
    // 注：实际中的密码处理应通过加密措施
    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  }
}
