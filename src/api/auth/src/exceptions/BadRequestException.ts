import { ExceptionResponseDto } from "../dtos/exception/ExceptionResponseDto";
import { BaseCustomException } from "./BaseCustomException";

export class BadRequestException extends BaseCustomException {
  public static readonly HTTP_ERROR_CODE = 400;

  constructor(message: string) {
    super(message);
  }

  public convert_into_http_error(): ExceptionResponseDto {
    return new ExceptionResponseDto(
      this.message,
      BadRequestException.HTTP_ERROR_CODE
    );
  }
}
