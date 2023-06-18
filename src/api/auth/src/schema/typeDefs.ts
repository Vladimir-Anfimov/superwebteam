import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    test: String!
  }

  type Mutation {
    login(input: UserLoginInput!): UserLoginOutput!
    register(input: UserRegisterInput!): UserRegisterOutput!
    refresh(input: RefreshInput!): RefreshOutput!
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
`;
