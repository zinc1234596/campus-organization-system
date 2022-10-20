import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddUserDto } from '@/user/user.dto';
import { AuthService } from '@/auth/auth.service';
import { Public } from '@/decorator/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: '登陆',
  })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() user: AddUserDto, @Req() req) {
    console.log(req);
    return this.authService.login(req);
  }
}
