export class ExceptionResponseDto {
  public message: string;
  public statusCode: string;

  constructor(message: string, statusCode: string) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
