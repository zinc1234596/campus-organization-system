import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from '@/user/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from "@/decorator/public.decorator";

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({
    summary: '新增用户',
  })
  @Post('/add')
  async create(@Body() user: AddUserDto) {
    return this.userService.createOrSave(user);
  }

  @ApiOperation({
    summary: '新增用户ttt',
  })
  @Post('/abc')
  async abc() {
    return this.userService.addUser();
  }

  @ApiOperation({
    summary: '验证token',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/token')
  async token() {
    return 123;
  }
}
