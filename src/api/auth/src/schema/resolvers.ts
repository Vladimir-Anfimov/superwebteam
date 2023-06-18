import { UserLoginRequestDto } from "../dtos/User/UserLoginRequestDto";
import { UserLoginResponseDto } from "../dtos/User/UserLoginResponseDto";
import { UserRegisterRequestDto } from "../dtos/User/UserRegisterRequestDto";
import { UserRegisterResponseDto } from "../dtos/User/UserRegisterResponseDto";
import { UserService } from "../services/UserService";
import { RefreshRequestDto } from "../dtos/User/RefreshRequestDto";
import { RefreshResponseDto } from "../dtos/User/RefreshResponseDto";

const resolvers = {
  Mutation: {
    login: async (
      _: any,
      { input }: { input: UserLoginRequestDto }
    ): Promise<UserLoginResponseDto> => {
      return await UserService.login(input);
    },
    register: async (
      _: any,
      { input }: { input: UserRegisterRequestDto }
    ): Promise<UserRegisterResponseDto> => {
      return await UserService.register(input);
    },
    refresh: async (
      _: any,
      { input }: { input: RefreshRequestDto }
    ): Promise<RefreshResponseDto> => {
      const token = await UserService.refresh(input.refreshToken);
      return new RefreshResponseDto(token);
    },
  },
  Query: {
    test: () => "Hello World!",
  },
};

export { resolvers };
