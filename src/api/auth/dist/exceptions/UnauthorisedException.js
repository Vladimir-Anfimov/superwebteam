"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorisedException = void 0;
const ExceptionResponseDto_1 = require("../dtos/exception/ExceptionResponseDto");
const BaseCustomException_1 = require("./BaseCustomException");
class UnauthorisedException extends BaseCustomException_1.BaseCustomException {
    constructor(message) {
        super(message, UnauthorisedException.HTTP_ERROR_CODE);
    }
    convert_into_http_error() {
        return new ExceptionResponseDto_1.ExceptionResponseDto(this.message, UnauthorisedException.HTTP_ERROR_CODE);
    }
}
exports.UnauthorisedException = UnauthorisedException;
UnauthorisedException.HTTP_ERROR_CODE = "UNAUTHORISED";
