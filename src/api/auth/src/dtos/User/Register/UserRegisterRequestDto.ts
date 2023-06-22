export class UserRegisterRequestDto {
  public email: string;
  public password: string;
  public confirmPassword: string;

  constructor(email: string, password: string, confirm_password: string) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirm_password;
  }
}
