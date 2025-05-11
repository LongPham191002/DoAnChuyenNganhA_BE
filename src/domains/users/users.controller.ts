import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete, UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import {JwtAuthGuard} from "../auth/auth.guard";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: Partial<User>) {
    return this.userService.create(user);
  }


  @UseGuards(JwtAuthGuard)  // Bảo vệ endpoint bằng JwtAuthGuard
  @Get(':id')
  async getProfile(@Param('id') id: number) {
    // Lấy thông tin người dùng từ service
    return this.userService.findOne(id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: Partial<User>) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
