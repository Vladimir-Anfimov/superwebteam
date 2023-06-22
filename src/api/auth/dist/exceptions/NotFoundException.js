"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const ExceptionResponseDto_1 = require("../dtos/exception/ExceptionResponseDto");
const BaseCustomException_1 = require("./BaseCustomException");
class NotFoundException extends BaseCustomException_1.BaseCustomException {
    constructor(message) {
        super(message, NotFoundException.HTTP_ERROR_CODE);
    }
    convert_into_http_error() {
        return new ExceptionResponseDto_1.ExceptionResponseDto(this.message, NotFoundException.HTTP_ERROR_CODE);
    }
}
exports.NotFoundException = NotFoundException;
NotFoundException.HTTP_ERROR_CODE = "NOT_FOUND";
