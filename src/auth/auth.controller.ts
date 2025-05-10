import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post()
  async login(@Body() body: { email: string; password: string }) {
    const userLogged = await this.authService.Login(body);

    return userLogged;
  }
}
