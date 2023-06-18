import { ExceptionResponseDto } from "../dtos/exception/ExceptionResponseDto";
import { BaseCustomException } from "./BaseCustomException";

export class NotFoundException extends BaseCustomException {
  public static readonly HTTP_ERROR_CODE = "NOT_FOUND";

  constructor(message: string) {
    super(message, NotFoundException.HTTP_ERROR_CODE);
  }

  public convert_into_http_error(): ExceptionResponseDto {
    return new ExceptionResponseDto(
      this.message,
      NotFoundException.HTTP_ERROR_CODE
    );
  }
}
