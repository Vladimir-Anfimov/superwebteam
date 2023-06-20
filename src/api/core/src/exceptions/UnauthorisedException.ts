import { ExceptionResponseDto } from "../dtos/exception/ExceptionResponseDto";
import { BaseCustomException } from "./BaseCustomException";

export class UnauthorisedException extends BaseCustomException {
  public static readonly HTTP_ERROR_CODE = "UNAUTHORISED";

  constructor(message: string) {
    super(message, UnauthorisedException.HTTP_ERROR_CODE);
  }

  public convert_into_http_error(): ExceptionResponseDto {
    return new ExceptionResponseDto(
      this.message,
      UnauthorisedException.HTTP_ERROR_CODE
    );
  }
}
