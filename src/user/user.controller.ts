import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from '@/user/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '新增用户',
  })
  @ApiBearerAuth()
  @Post('/addUser')
  async create(@Body() user: AddUserDto) {
    return this.userService.createOrSave(user);
  }
}
