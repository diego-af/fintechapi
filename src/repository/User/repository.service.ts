import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from '../../DTO/User/user.dto';

@Injectable()
export class RepositoryService {
  @Inject()
  private readonly prisma: PrismaService;

  async createUserRepository(userData: UserDto) {
    return this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async verifyUserAlreadyExists(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async verifyUserAlreadyExistsId(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async updateUserRepository(userData: UserDto, id: string) {
    const userUpdated = await this.prisma.user.update({
      where: {
        id: String(id),
      },
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
    });

    return userUpdated;
  }

  async deleteuser(id: string) {
    return this.prisma.user.delete({
      where: {
        id: String(id),
      },
    });
  }

  async getUSerById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
