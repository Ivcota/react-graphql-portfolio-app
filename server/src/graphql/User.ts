import { extendType, intArg, list, nonNull, objectType } from "nexus";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";

import dotenv from "dotenv";
dotenv.config();

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
    t.field("projects", {
      type: nonNull(list("Project")),
      // @ts-expect-error
      async resolve({ id }, __, { db }) {
        try {
          const projects = await db.project.findMany({
            where: {
              userId: {
                equals: id,
              },
            },
          });

          return projects.map((project) => {
            return {
              id: project.id,
              title: project.title,
              imageUrl: project.imageUrl,
              githubURL: project.githubURL,
              websiteURL: project.websiteURL,
              desc: project.desc,
            };
          });
        } catch (error) {
          return [];
        }
      },
    });
  },
});

export const UserResponse = objectType({
  name: "UserResponse",
  definition(t) {
    t.nonNull.int("code");
    t.nonNull.boolean("success");
    t.nonNull.string("message");
    t.nullable.field("User", {
      type: "User",
    });
    t.string("token");
  },
});

// Queries
export const getManyUsers = extendType({
  type: "Query",
  definition(t) {
    t.field("GetManyUsers", {
      description: "Get a list of users.",
      type: nonNull(list("User")),
      args: {
        skip: nonNull(
          intArg({
            default: 0,
            description: "The amount of entries to skip.",
          })
        ),
        take: nonNull(
          intArg({
            default: 100,
            description: "The amount of entries to take.",
          })
        ),
      },
      async resolve(_, { skip, take }, { db }) {
        try {
          const users = await db.user.findMany({
            skip,
            take,
          });

          return users;
        } catch (error) {
          return [];
        }
      },
    });
  },
});

export const getSingleUser = extendType({
  type: "Query",
  definition(t) {
    t.field("GetSingleUser", {
      description: "Get single user",
      type: "User",
      args: {
        id: nonNull(
          intArg({
            description: "user id",
          })
        ),
      },
      async resolve(_, { id }, { db }) {
        try {
          const user = await db.user.findUnique({
            where: {
              id,
            },
          });

          return user;
        } catch (error) {
          return null;
        }
      },
    });
  },
});

// Mutations
export const createUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("CreateUser", {
      description: "Create a single new user",
      type: "UserResponse",
      args: {
        firstName: nonNull("String"),
        email: nonNull("String"),
        password: nonNull("String"),
      },
      // @ts-expect-error
      async resolve(_, { firstName, email, password }, { db }) {
        try {
          const salt = await bycrpt.genSalt(10);
          const hash = await bycrpt.hash(password, salt);

          const user = await db.user.create({
            data: {
              firstName,
              email,
              password: hash,
            },
          });

          const token = jwt.sign(
            {
              id: user.id,
            },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "30d",
            }
          );

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
            token,
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

export const userLogin = extendType({
  type: "Mutation",
  definition(t) {
    t.field("UserLogin", {
      type: "UserResponse",
      args: {
        email: nonNull("String"),
        password: nonNull("String"),
      },
      // @ts-expect-error
      async resolve(_, { email, password }, { db }) {
        try {
          const user = await db.user.findFirst({
            where: {
              email: email.toLowerCase(),
            },
          });
          const isMatch = await bycrpt.compare(
            password,
            user?.password as string
          );

          const token = jwt.sign(
            {
              id: user?.id,
            },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "30d",
            }
          );

          if (isMatch) {
            return {
              code: 200,
              success: true,
              message: "login successful",
              User: user,
              token,
            };
          } else {
            return {
              code: 400,
              message: "Incorrect credentials",
              success: false,
            };
          }
        } catch (error) {
          return {
            code: 400,
            message: error,
            success: false,
          };
        }
      },
    });
  },
});

export const editUser = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("EditUser", {
      type: "UserResponse",
      args: {
        id: nonNull("Int"),
        firstName: "String",
        lastName: "String",
        websiteURL: "String",
        githubURL: "String",
        profilePictureURL: "String",
        socialMediaURL: "String",
      },
      async resolve(_, args, { db }) {
        const user = await db.user.findUnique({
          where: {
            id: args.id,
          },
        });

        const updatedUser = await db.user.update({
          where: {
            id: args.id,
          },
          data: {
            firstName: args.firstName || user?.firstName,
            lastName: args.lastName || user?.lastName,
            profilePictureURL:
              args.profilePictureURL || user?.profilePictureURL,
            githubURL: args.githubURL || user?.githubURL,
            socialMediaURL: args.socialMediaURL || user?.socialMediaURL,
            websiteURL: args.websiteURL || user?.websiteURL,
          },
        });

        return {
          code: 200,
          message: "User updated",
          success: true,
          User: updatedUser,
        };
      },
    });
  },
});

export const deleteUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("DeleteUser", {
      type: "Boolean",
      args: {
        id: nonNull("Int"),
      },
      async resolve(_, { id }, { db }) {
        try {
          await db.user.delete({
            where: {
              id,
            },
          });

          return true;
        } catch (error) {
          return false;
        }
      },
    });
  },
});
