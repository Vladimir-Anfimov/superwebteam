import { ApolloError } from "apollo-server";
import { ExceptionResponseDto } from "../dtos/exception/ExceptionResponseDto";

export abstract class BaseCustomException extends ApolloError {
  abstract convert_into_http_error(): ExceptionResponseDto;
}
