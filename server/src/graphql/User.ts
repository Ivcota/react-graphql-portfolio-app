import { extendType, nonNull, objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id", {});
    t.nonNull.string("email");
    t.nonNull.string("firstName");
    t.string("lastName");
    t.nonNull.boolean("isAdmin");
    t.string("profilePictureURL");
    t.string("socialMediaURL");
    t.string("websiteURL");
    t.string("githubURL");
  },
});

export const createUserResponse = objectType({
  name: "CreateUserResponse",
  definition(t) {
    t.nonNull.int("code");
    t.nonNull.boolean("success");
    t.nonNull.string("message");
    t.nullable.field("User", {
      type: "User",
    });
  },
});

// Queries

// Mutations
export const createUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("CreateUser", {
      description: "Create a single new user",
      type: "CreateUserResponse",
      args: {
        firstName: nonNull("String"),
        email: nonNull("String"),
        password: nonNull("String"),
      },
      // @ts-expect-error
      async resolve(_, { firstName, email, password }, { db }) {
        try {
          const user = await db.user.create({
            data: {
              firstName,
              email,
              password,
            },
          });

          return {
            code: 200,
            success: true,
            message: `${user.firstName} has been created.`,
            User: {
              id: user.id,
              firstName: user.firstName,
              email: user.email,
              isAdmin: false,
            },
          };
        } catch (error) {
          return {
            code: 500,
            success: false,
            message: error,
            User: null,
          };
        }
      },
    });
  },
});
