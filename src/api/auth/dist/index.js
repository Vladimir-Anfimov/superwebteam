"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs_1 = require("./schema/typeDefs");
const resolvers_1 = require("./schema/resolvers");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
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
            const user = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            return { user };
        }
        catch (e) {
            return { user: null };
        }
    },
});
server.listen({ port: process.env.PORT || 8080 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
