import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@/user/user.entities';
import { AddUserDto } from '@/user/user.dto';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() user: AddUserDto, @Req() req): Promise<User> {
    return req.user;
  }
}
