"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
  type Query {
    test: String!
  }

  type Mutation {
    login(input: UserLoginInput!): UserLoginOutput!
    register(input: UserRegisterInput!): UserRegisterOutput!
    refresh(input: RefreshInput!): RefreshOutput!
    updateEmail(input: UpdateEmailInput!): String!
    updatePassword(input: UpdatePasswordInput!): String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type UserLoginOutput {
    token: String!
    refreshToken: String!
  }

  input UserRegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
  }

  type UserRegisterOutput {
    token: String!
    refreshToken: String!
  }

  input RefreshInput {
    refreshToken: String!
  }

  type RefreshOutput {
    token: String!
  }

  input UpdateEmailInput {
    newEmail: String!
  }

  input UpdatePasswordInput {
    currentPassword: String!
    newPassword: String!
  }
`;
