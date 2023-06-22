export class User {
  public id: number;
  public email: string;
  public hashed_password: string;
  public last_time_active: Date;
  public created_at: Date;

  private constructor(id: number, email: string, hashed_password: string) {
    this.id = id;
    this.email = email;
    this.hashed_password = hashed_password;

    const now = new Date();
    this.last_time_active = now;
    this.created_at = now;
  }

  public static create(email: string, hashed_password: string): User {
    return new User(0, email, hashed_password);
  }
}
