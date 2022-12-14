import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/user/user.entities';
import { BusinessException } from '@/common/exceptions/business.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
    this.authService = authService;
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validate(username, password);
    if (user) return user;
    else BusinessException.throwUserOrPasswordError();
  }
}
