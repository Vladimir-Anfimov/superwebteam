import { ApolloServer } from "apollo-server";
import { BaseCustomException } from "./exceptions/BaseCustomException";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.log(`Error ${JSON.stringify(err)} `);

    return err;
  },
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
