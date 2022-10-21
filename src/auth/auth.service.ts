import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { User } from '@/user/user.entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.userService = userService;
  }

  /**
   * 校验username password
   * @param username
   * @param password
   */
  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.find(email);
    // 注：实际中的密码处理应通过加密措施
    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  }
  /**
   * user login
   * @param user
   */
  async login(user: User) {
    const { id, email } = user;
    return {
      // 签发token（根据username, id）
      token: this.jwtService.sign({ email, id }),
    };
  }
}
