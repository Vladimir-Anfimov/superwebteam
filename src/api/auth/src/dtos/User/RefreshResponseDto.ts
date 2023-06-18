export class RefreshResponseDto {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }
}
