export class User {
  public id: number;
  public email: string;
  public hashed_password: string;

  private constructor(id: number, email: string, hashed_password: string) {
    this.id = id;
    this.email = email;
    this.hashed_password = hashed_password;
  }

  public static create(email: string, hashed_password: string): User {
    return new User(0, email, hashed_password);
  }
}
