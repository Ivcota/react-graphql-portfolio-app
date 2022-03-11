import { extendType, intArg, nonNull, objectType } from "nexus";

// types
export const Project = objectType({
  name: "Project",
  description: "A project object that's related to a user",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("title");
    t.nonNull.string("imageUrl");
    t.nonNull.string("desc");
    t.nonNull.string("githubURL");
    t.string("websiteURL");
  },
});

export const createProjectResponse = objectType({
  name: "CreateProjectResponse",
  description: "Response object for the createProject mutation",
  definition(t) {
    t.nonNull.int("code");
    t.nonNull.boolean("success");
    t.nonNull.string("message");
    t.field("project", {
      type: "Project",
    });
  },
});

// Queries

export const getSingleProject = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("SingleProject", {
      type: "Project",
      args: {
        id: nonNull(intArg({ description: "Project ID" })),
      },
      // @ts-expect-error
      async resolve(_, { id }, { db }) {
        return db.project.findUnique({
          where: {
            id,
          },
        });
      },
    });
  },
});

// Mutations
export const createProject = extendType({
  type: "Mutation",
  definition(t) {
    t.field("CreateProject", {
      description: "Create a new project serverside",
      type: "CreateProjectResponse",
      args: {
        title: nonNull("String"),
        imageUrl: nonNull("String"),
        desc: nonNull("String"),
        githubURL: nonNull("String"),
        websiteURL: "String",
        userId: "Int",
      },
      // @ts-expect-error
      async resolve(
        _,
        { title, desc, githubURL, imageUrl, websiteURL, userId },
        { db }
      ) {
        try {
          const project = await db.project.create({
            data: {
              title,
              desc,
              githubURL,
              imageUrl,
              websiteURL,
              userId,
            },
          });

          return {
            code: 201,
            success: true,
            message: "Project has been created",
            project,
          };
        } catch (error) {
          return {
            code: 400,
            message: error,
            success: false,
            project: null,
          };
        }
      },
    });
  },
});
