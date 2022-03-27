import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import { graphqlUploadExpress } from "graphql-upload";
import { context } from "./context";
import { schema } from "./schema";
import cors from "cors";
const MemoryStore = require("memorystore")(session);

const app = express();
const TEMP_SESSION_SECRET = "temp-session-secret";

const startServer = async () => {
  app.use(
    cors({
      credentials: true,
      // 2:40 - cors error ben awad FullStack - React
      // Cors error will tell us what value we should put here on the front-end
      origin: "http://localhost:3000",
    })
  );

  app.use(graphqlUploadExpress());

  app.use(
    session({
      name: "qid",
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      secret: TEMP_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Days
      },
    })
  );

  // Add the express request object to the context
  // https://stackoverflow.com/questions/60905926/apolloserver-pass-headers-from-request-through-to-backend
  const server = new ApolloServer({ schema, context });

  await server.start();

  // 2:40 - cors error ben awad FullStack - React
  server.applyMiddleware({ app, cors: false });

  await new Promise((resolve) => {
    app.listen(4000, () => {
      console.log(
        4000,
        `Server is running at http://localhost:4000${server.graphqlPath}`
      );
    });
    resolve as any;
  });
};

startServer();
