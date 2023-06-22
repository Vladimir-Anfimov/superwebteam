import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

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
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    console.log("TOKEN: " + token);

    try {
      const user = jwt.verify(token, process.env.JWT_KEY!);

      return { user };
    } catch (e) {
      return { user: null };
    }
  },
});

server.listen({ port: process.env.SERVER_PORT! }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
