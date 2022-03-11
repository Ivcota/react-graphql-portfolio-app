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
        imageURL: nonNull("String"),
        desc: nonNull("String"),
        githubURL: nonNull("String"),
        websiteURL: "String",
      },
    });
  },
});
