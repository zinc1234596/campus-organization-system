import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@/decorator/public.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '获取邮箱验证码',
  })
  @Public()
  @Get('/getCode')
  async getEmailCode(@Query('email') email: string) {
    return await this.userService.handelVerifyCodeEmail(email);
  }

  @ApiOperation({
    summary: '注册',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'xxx@mail.com' },
        password: { type: 'string', example: 'Abc123456!!?' },
        verifyCode: { type: 'string', example: '001122' },
      },
    },
  })
  @Public()
  @Post('/registered')
  async registered(@Body() body) {
    return this.userService.registered(body);
  }
}
