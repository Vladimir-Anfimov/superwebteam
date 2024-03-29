"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs_1 = require("./schema/typeDefs");
const resolvers_1 = require("./schema/resolvers");
const UnauthorisedException_1 = require("./exceptions/UnauthorisedException");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = require("./services/UserService");
dotenv_1.default.config();
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
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
        await UserService_1.UserService.updateLastTimeActive(1);
        try {
            const user = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            await UserService_1.UserService.updateLastTimeActive(user.id);
            return { user };
        }
        catch (e) {
            console.log("Failed to authenticate");
            throw new UnauthorisedException_1.UnauthorisedException("Token is invalid.");
        }
    },
});
server.listen({ port: process.env.PORT || 8080 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
