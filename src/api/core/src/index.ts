import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { UnauthorisedException } from "./exceptions/UnauthorisedException";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserService } from "./services/UserService";
import { User } from "./entities/User";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  },
  formatError: (err) => {
    console.log(`Error ${JSON.stringify(err)} `);
    return err;
  },
  context: async ({ req }) => {
    const token = req.headers.authorization || "";

    await UserService.updateLastTimeActive(1);

    try {
      const user = jwt.verify(token, process.env.JWT_KEY!) as User;

      await UserService.updateLastTimeActive(user.id);

      return { user };
    } catch (e) {
      console.log("Failed to authenticate");
      throw new UnauthorisedException("Token is invalid.");
    }
  },
});

server.listen({ port: process.env.PORT || 8080 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
