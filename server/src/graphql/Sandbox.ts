import { extendType } from "nexus";

export const helloQuery = extendType({
  type: "Query",
  definition(t) {
    t.string("session", {
      resolve(_, __, { req }) {
        (req.session as any).user = "Iverson";
        return "Done";
      },
    });
  },
});

export const testQuery = extendType({
  type: "Query",
  definition(t) {
    t.string("test", {
      resolve(_, __, { req }) {
        console.log((req.session as any).userId);
        return (req.session as any).user as string;
      },
    });
  },
});
