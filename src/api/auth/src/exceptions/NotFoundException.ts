import { ExceptionResponseDto } from "../dtos/exception/ExceptionResponseDto";
import { BaseCustomException } from "./BaseCustomException";

export class NotFoundException extends BaseCustomException {
  public static readonly HTTP_ERROR_CODE = 404;

  constructor(message: string) {
    super(message);
  }

  public convert_into_http_error(): ExceptionResponseDto {
    return new ExceptionResponseDto(
      this.message,
      NotFoundException.HTTP_ERROR_CODE
    );
  }
}
