import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import { graphqlUploadExpress } from "graphql-upload";
import { context } from "./context";
import { schema } from "./schema";

// import connectRedis from "connect-redis";
// import { createClient } from "redis";

const app = express();
const TEMP_SESSION_SECRET = "temp-session-secret";

// const RedisStore = connectRedis(session);
// const redisClient = createClient();
// redisClient.connect().catch(console.error);

const startServer = async () => {
  app.use(graphqlUploadExpress());

  app.use(
    session({
      // store: new RedisStore({
      // client: redisClient,
      // }),
      secret: TEMP_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: "auto",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Days
      },
    })
  );

  // Add the express request object to the context
  // https://stackoverflow.com/questions/60905926/apolloserver-pass-headers-from-request-through-to-backend
  const server = new ApolloServer({ schema, context });

  await server.start();

  server.applyMiddleware({ app });

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
