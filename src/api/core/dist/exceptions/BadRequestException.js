"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const ExceptionResponseDto_1 = require("../dtos/exception/ExceptionResponseDto");
const BaseCustomException_1 = require("./BaseCustomException");
class BadRequestException extends BaseCustomException_1.BaseCustomException {
    constructor(message) {
        super(message);
    }
    convert_into_http_error() {
        return new ExceptionResponseDto_1.ExceptionResponseDto(this.message, BadRequestException.HTTP_ERROR_CODE);
    }
}
exports.BadRequestException = BadRequestException;
BadRequestException.HTTP_ERROR_CODE = "BAD_REQUEST";
