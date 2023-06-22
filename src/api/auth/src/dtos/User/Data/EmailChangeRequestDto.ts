export class EmailChangeRequestDto {
  public newEmail: string;

  constructor(newEmail: string) {
    this.newEmail = newEmail;
  }
}
