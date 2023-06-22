export class UserLoginResponseDto {
  private token: string;
  private refreshToken: string;

  constructor(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
