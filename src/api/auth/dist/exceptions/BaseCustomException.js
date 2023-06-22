"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCustomException = void 0;
const apollo_server_1 = require("apollo-server");
class BaseCustomException extends apollo_server_1.ApolloError {
}
exports.BaseCustomException = BaseCustomException;
