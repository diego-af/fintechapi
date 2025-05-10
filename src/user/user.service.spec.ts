import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { RepositoryService } from '../repository/User/repository.service';

import { UserDto } from '../DTO/User/user.dto';
import { ConflictException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: RepositoryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: RepositoryService,
          useValue: {
            verifyUserAlreadyExists: jest.fn(),
            createUserRepository: jest.fn(),
            getAllUsers: jest.fn(),
            updateUserRepository: jest.fn(),
          },
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    userRepository = module.get<RepositoryService>(RepositoryService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should create a user', async () => {
    const mockUser: UserDto = {
      email: 'dev@teste.com',
      name: 'dev',
      password: '123456',
    };

    jest
      .spyOn(userRepository, 'verifyUserAlreadyExists')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'createUserRepository').mockResolvedValue({
      id: '1',
      email: mockUser.email,
      name: mockUser.name,
    });

    const result = await userService.createUser(mockUser);

    expect(userRepository.verifyUserAlreadyExists).toHaveBeenCalled();
    expect(userRepository.verifyUserAlreadyExists).toHaveBeenCalledWith(
      mockUser.email,
    );
    expect(userRepository.createUserRepository).toHaveBeenCalled();
    expect(userRepository.createUserRepository).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual({
      id: '1',
      email: mockUser.email,
      name: mockUser.name,
    });
  });

  it('should throw an error if user already exists', async () => {
    const mockUser: UserDto = {
      name: 'dev',
      email: 'dev@teste',
      password: '123456',
    };

    jest.spyOn(userRepository, 'verifyUserAlreadyExists').mockResolvedValue({
      name: 'dev',
      id: '1',
      email: 'dev@teste',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(userService.createUser(mockUser)).rejects.toThrow(
      new ConflictException('Error creating user'),
    );
    expect(userRepository.createUserRepository).not.toHaveBeenCalled();
  });

  it('should get All users', async () => {
    const mockerResponse = [
      {
        id: 'cm9vf2jv80000rtqs8l8vnwee',
        name: 'João Silva',
        email: 'carlos emanoel ',

        password: 'Senha@123',
        createdAt: new Date('2025-04-24T13:46:55.888Z'),
        updatedAt: new Date('2025-04-24T13:46:55.888Z'),
      },
      {
        id: 'cm9vf2jv80000rtqs8l8vnwee',
        name: 'João Silva',
        email: 'carlos emanoel ',
        password: 'Senha@123',
        createdAt: new Date('2025-04-24T13:46:55.888Z'),
        updatedAt: new Date('2025-04-24T13:46:55.888Z'),
      },
    ];
    jest.spyOn(userRepository, 'getAllUsers').mockResolvedValue(mockerResponse);
    const result = await userService.getAllUsers();

    expect(userRepository.getAllUsers).toHaveBeenCalled();
    expect(result).toEqual(mockerResponse);
  });

  it('should update a user', async () => {
    const mockeruser: UserDto = {
      name: 'dev',
      email: 'dev@teste',
      password: '123',
    };

    const id = '1';

    jest.spyOn(userRepository, 'verifyUserAlreadyExists').mockResolvedValue({
      name: 'dev',
      id: '1',
      email: 'devd@teste',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(userRepository, 'updateUserRepository').mockResolvedValue({
      name: 'dev',
      id: '1',
      email: 'devd@teste',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await userService.updateUser(mockeruser, id);
    expect(userRepository.verifyUserAlreadyExists).toHaveBeenCalled();
    expect(userRepository.updateUserRepository).toHaveBeenCalled();

    expect(result).toEqual({
      name: 'dev',
      id: '1',
      email: 'devd@teste',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it('should throw an error if user not found', async () => {
    const mockeruser: UserDto = {
      name: 'dev',
      email: 'dev@teste',
      password: '123',
    };

    const id = '2';

    jest
      .spyOn(userRepository, 'verifyUserAlreadyExists')
      .mockResolvedValue(null);

    await expect(userService.updateUser(mockeruser, id)).rejects.toThrow(
      new ConflictException('User not found'),
    );

    expect(userRepository.updateUserRepository).not.toHaveBeenCalled();
  });
});
