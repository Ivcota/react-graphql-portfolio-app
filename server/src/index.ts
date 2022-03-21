import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { context } from "./context";
import { graphqlUploadExpress } from "graphql-upload";
import session from "express-session";

const app = express();
const TEMP_SESSION_SECRET = "temp-session-secret";

const startServer = async () => {
  app.use(graphqlUploadExpress());

  app.use(
    session({
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
