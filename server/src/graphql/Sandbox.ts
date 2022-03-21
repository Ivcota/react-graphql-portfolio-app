import { extendType } from "nexus";

export const helloQuery = extendType({
  type: "Query",
  definition(t) {
    t.string("message", {
      resolve(_, __, { req }) {
        return "Hello World";
      },
    });
  },
});
