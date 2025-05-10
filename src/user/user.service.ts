import { HttpException, Inject, Injectable } from '@nestjs/common';

import { UserDto } from '../DTO/User/user.dto';
import { RepositoryService } from '../repository/User/repository.service';

@Injectable()
export class UserService {
  @Inject()
  private userRepository: RepositoryService;

  async createUser(userDto: UserDto) {
    try {
      const userAlreadyExists =
        await this.userRepository.verifyUserAlreadyExists(userDto.email);

      if (userAlreadyExists) {
        throw new HttpException('User already exists', 400);
      }

      const user = await this.userRepository.createUserRepository(userDto);

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creating user', 500);
    }
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();

    if (!users) {
      throw new HttpException('No users found', 404);
    }

    return users;
  }

  async updateUser(useData: UserDto, id: string) {
    const userExists = await this.userRepository.verifyUserAlreadyExists(
      useData.email,
    );

    if (!userExists) {
      throw new HttpException('User not found', 404);
    }
    const user = await this.userRepository.updateUserRepository(useData, id);

    if (!user) {
      throw new HttpException('User not updated', 404);
    }

    return user;
  }

  async deleteUser(id: string) {
    const userExists = await this.userRepository.verifyUserAlreadyExistsId(id);

    if (!userExists) {
      throw new HttpException('User not found', 404);
    }

    const userDeleted = await this.userRepository.deleteuser(id);

    if (!userDeleted) {
      throw new HttpException('User not deleted', 404);
    }

    return userDeleted;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.getUSerById(id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }
}
