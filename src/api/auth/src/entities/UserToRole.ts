export class UsersToRoles {
  public id: number;
  public id_user: number;
  public id_role: number;

  constructor(id: number, id_user: number, id_role: number) {
    this.id = id;
    this.id_user = id_user;
    this.id_role = id_role;
  }
}
