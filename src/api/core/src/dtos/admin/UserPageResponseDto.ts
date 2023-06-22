import { User } from "../../entities/User";

export class UserPageResponseDto {
  users: User[];
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  constructor(
    users: User[],
    pageNumber: number,
    pageSize: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
  ) {
    this.users = users;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.hasNextPage = hasNextPage;
    this.hasPreviousPage = hasPreviousPage;
  }
}
