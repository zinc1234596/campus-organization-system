import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/user/user.entities';
import { BusinessException } from '@/common/exceptions/business.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
    this.authService = authService;
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validate(email, password);
    if (user) return user;
    else BusinessException.throwEmailOrPasswordError();
  }
}
