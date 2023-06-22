import { UserLoginRequestDto } from "../dtos/User/Login/UserLoginRequestDto";
import { UserLoginResponseDto } from "../dtos/User/Login/UserLoginResponseDto";
import { UserRegisterRequestDto } from "../dtos/User/Register/UserRegisterRequestDto";
import { UserRegisterResponseDto } from "../dtos/User/Register/UserRegisterResponseDto";
import { UserService } from "../services/UserService";
import { RefreshRequestDto } from "../dtos/User/Refresh/RefreshRequestDto";
import { RefreshResponseDto } from "../dtos/User/Refresh/RefreshResponseDto";
import { EmailChangeRequestDto } from "../dtos/User/Data/EmailChangeRequestDto";
import { PasswordChangeRequestDto } from "../dtos/User/Data/PasswordChangeRequestDto";
import { UnauthorisedException } from "../exceptions/UnauthorisedException";

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
    updateEmail: async (
      _: any,
      { input }: { input: EmailChangeRequestDto },
      context: any
    ): Promise<string> => {
      const user = context.user;
      if (!user) {
        throw new UnauthorisedException("User not authenticated");
      }
      await UserService.updateEmail(input, user.id);
      return "OK";
    },
    updatePassword: async (
      _: any,
      { input }: { input: PasswordChangeRequestDto },
      context: any
    ): Promise<string> => {
      const user = context.user;
      if (!user) {
        throw new UnauthorisedException("User not authenticated");
      }
      await UserService.updatePassword(input, user.id);
      return "OK";
    },
  },
  Query: {
    test: () => "Hello World!",
  },
};

export { resolvers };
