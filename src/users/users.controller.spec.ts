import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos';
import { Controller, NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  const fakeUser = { id: 1, email: 'asdf@gmail.com', password: 'asdf' };
  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) => Promise.resolve({ ...fakeUser, id }),
      find: (email: string) => Promise.resolve([{ ...fakeUser, email }]),
    };

    fakeAuthService = {
      signup: (email, password) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        }),
      signin: (email, password) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign up a new user', async () => {
    const userDto: CreateUserDto = {
      email: 'test@gmail.com',
      password: 'test123',
    };

    const user = await controller.createUser(userDto, {});
    expect(user.email).toEqual('test@gmail.com');
  });

  it('user should be able to sign in', async () => {
    const session = { userId: null };
    const userDto: CreateUserDto = {
      email: 'test@gmail.com',
      password: 'test123',
    };

    const user = await controller.signin(userDto, session);
    expect(user.email).toEqual('test@gmail.com');
    expect(session.userId).toEqual(1);
  });

  it('find register user', async () => {
    const user = await controller.findUser('1');
    expect(user.id).toEqual(1);
  });

  it('find users by email', async () => {
    const [user] = await controller.findAllUsers('test@gmail.com');
    expect(user.email).toEqual('test@gmail.com');
  });

  it('findUser throws an erro if user with given id is not found', async () => {
    fakeUserService.findOne = () => Promise.resolve(null);
    await expect(controller.findUser('1')).rejects.toThrowError(
      NotFoundException,
    );
  });
});
