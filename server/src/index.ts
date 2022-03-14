import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { context } from "./context";
import { graphqlUploadExpress } from "graphql-upload";

const app = express();

const startServer = async () => {
  const server = new ApolloServer({ schema, context });

  await server.start();

  app.use(graphqlUploadExpress());

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
