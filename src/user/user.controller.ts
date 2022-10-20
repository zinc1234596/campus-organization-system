import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from '@/user/user.dto';
import { sendVerifyCodeEmail } from '@/utils/email';
import { Public } from '@/decorator/public.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiOperation({
  //   summary: '新增用户',
  // })
  // @ApiBearerAuth()
  // @Post('/addUser')
  // async create(@Body() user: AddUserDto) {
  //   return this.userService.createOrSave(user);
  // }

  @ApiOperation({
    summary: '获取邮箱验证码',
  })
  @Public()
  @Get('/getCode')
  async getEmailCode(@Query('email') email: string) {
    return await sendVerifyCodeEmail(email);
  }

  @ApiOperation({
    summary: '注册',
  })
  @Public()
  @Post('/registered')
  async registered(@Body() body) {
    return this.userService.registered(body);
  }
}
