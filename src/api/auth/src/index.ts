import { ApolloServer } from "apollo-server";
import { BaseCustomException } from "./exceptions/BaseCustomException";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.log(`Error ${JSON.stringify(err)}`);
    if (err instanceof BaseCustomException) {
      return err.convert_into_http_error();
    }
    return err;
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
