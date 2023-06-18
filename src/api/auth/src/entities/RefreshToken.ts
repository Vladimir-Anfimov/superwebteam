import { v4 as uuidv4 } from "uuid";

export class RefreshToken {
  private static readonly EXPIRES_IN_30_DAYS = 1000 * 60 * 60 * 24 * 30;

  public id: number;
  public id_user: number;
  public value: string;
  public expires_at: Date;

  private constructor(id_user: number, value: string, expires_at: Date) {
    this.id = 0;
    this.id_user = id_user;
    this.value = value;
    this.expires_at = expires_at;
  }

  public static create(id_user: number): RefreshToken {
    return new RefreshToken(
      id_user,
      uuidv4(),
      new Date(Date.now() + this.EXPIRES_IN_30_DAYS)
    );
  }
}
