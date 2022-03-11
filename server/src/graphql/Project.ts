import { extendType, nonNull, objectType } from "nexus";

// types
export const Project = objectType({
  name: "Project",
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

// Mutations

export const createProject = extendType({
  type: "Mutation",
  definition(t) {
    t.field("CreateProject", {
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
      },
    });
  },
});
