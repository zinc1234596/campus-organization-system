import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AddUserDto {
  @ApiProperty({ example: 'xxx@mail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123' })
  @IsNotEmpty()
  password: string;
}
