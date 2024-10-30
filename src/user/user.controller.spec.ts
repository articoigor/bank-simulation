import { RedisRepository } from "../cache/cache.repository";
import { AuthInterceptor } from "../auth.interceptor";
import { NewUserDto } from "./dtos/newUser.dto";
import { RegisterNewUserResponse } from "./dtos/registerNewUser.response";
import { RetrieveUsersResponse } from "./dtos/retrieveUsers.response";
import { SignInResponse } from "./dtos/signIn.response";
import { TransactionDto } from "./dtos/transaction.dto";
import { UserDto } from "./dtos/user.dto";
import { UserUpdateDto } from "./dtos/userUpdate.dto";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository"; // Import UserRepository
import { Test, TestingModule } from '@nestjs/testing';

// Mock UserRepository
const mockUserRepository = {
  getAllUsers: jest.fn().mockResolvedValue({
    users: [
      {
        id: '123',
        username: "admin",
        birthdate: "01/01/1900",
        balance: 1000,
      }
    ]
  }),
  getUserByName: jest.fn().mockResolvedValue({
    id: '123',
    username: "testuser",
    birthdate: "01/01/2000",
    balance: 100,
  }),
  getUserById: jest.fn().mockResolvedValue({
    id: '123',
    username: "testuser",
    birthdate: "01/01/2000",
    balance: 100,
  }),
  insertUser: jest.fn().mockResolvedValue({
    id: '123',
    username: "testuser",
    birthdate: "01/01/2000",
    balance: 100,
  }),
  updateUser: jest.fn().mockResolvedValue(undefined),
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    retrieveUsers: jest.fn(),
    updateUserBalance: jest.fn(),
    registarNewUser: jest.fn(),
    signIn: jest.fn(),
    processTransaction: jest.fn(),
    userRepository: mockUserRepository, // Directly using the mock repository
  };

  const mockRedisRepository = {
    getToken: jest.fn(),
  };

  const mockAuthInterceptor = {
    intercept: jest.fn((_, next) => next.handle()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: AuthInterceptor,
          useValue: mockAuthInterceptor,
        },
        {
          provide: RedisRepository,
          useValue: mockRedisRepository,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('retrieveUsers', () => {
    it('should return an array of users', async () => {
      const result: RetrieveUsersResponse = await userService.retrieveUsers();

      expect(await userController.retrieveUsers()).toEqual(result);
      expect(userService.retrieveUsers).toHaveBeenCalled();
    });
  });

  describe('updateUserBalance', () => {
    it('should update user balance successfully', async () => {
      const userUpdateDto: UserUpdateDto = new UserUpdateDto('123', 300);
      
      jest.spyOn(userService, 'updateUserBalance').mockResolvedValue(undefined);

      await userController.updateUserBalance(userUpdateDto);

      expect(userService.updateUserBalance).toHaveBeenCalledWith(userUpdateDto);
    });
  });

  describe('registarNewUser', () => {
    it('should register a new user successfully', async () => {
      const newUserDto: NewUserDto = new NewUserDto('testuser', 'password', '01/01/2000');
      const result: RegisterNewUserResponse = { id: 123 };
      jest.spyOn(userService, 'registarNewUser').mockResolvedValue(result);

      expect(await userController.registarNewUser(newUserDto)).toEqual(result);
      expect(userService.registarNewUser).toHaveBeenCalledWith(newUserDto);
    });
  });

  describe('signIn', () => {
    it('should sign in successfully', async () => {
      const userDto: UserDto = new UserDto('testuser', 'password');
      const result: SignInResponse = { token: 'fake-jwt-token', expiresIn: new Date().toISOString() };
      jest.spyOn(userService, 'signIn').mockResolvedValue(result);

      expect(await userController.signIn(userDto)).toEqual(result);
      expect(userService.signIn).toHaveBeenCalledWith(userDto);
    });
  });

  describe('processTransaction', () => {
    it('should process a transaction successfully', async () => {
      const transactionDto: TransactionDto = new TransactionDto('123', '456', 50);
      jest.spyOn(userService, 'processTransaction').mockResolvedValue(undefined);

      await userController.processTransaction(transactionDto);

      expect(userService.processTransaction).toHaveBeenCalledWith(transactionDto);
    });
  });
});
