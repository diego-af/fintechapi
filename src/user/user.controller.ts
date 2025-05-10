import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../DTO/User/user.dto';
import { AuthGuard } from '../AuthGuards/auth.guard';

@Controller('user')
export class UserController {
  @Inject()
  private userService: UserService;

  @Post('create')
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.createUser(userDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Put('/:id')
  async updateUser(@Body() userData: UserDto, @Param('id') id: string) {
    console.log(userData, id);
    return await this.userService.updateUser(userData, id);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.deleteUser(id);

    if (user) {
      return {
        message: 'User deleted successfully',
      };
    }
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }
}
