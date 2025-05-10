import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject()
  private prisma: PrismaService;

  @Inject()
  private jwtService: JwtService;

  async Login(body: { email: string; password: string }) {
    const userLogged = await this.prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!userLogged) {
      throw new HttpException('User not found', 401);
    }

    const payload = { sub: userLogged.id, name: userLogged.name };

    return {
      token: await this.jwtService.signAsync(payload),
      success: true,
    };
  }
}
