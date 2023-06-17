"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = (0, apollo_server_1.gql) `
  type Query {
    hello: String
  }
`;
// Resolvers define the technique for fetching the types in the schema.
// Here, the "hello" resolver returns a hard-coded string.
const resolvers = {
    Query: {
        hello: () => "Hello, world!",
    },
};
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
