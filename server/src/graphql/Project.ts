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

export const ProjectResponse = objectType({
  name: "ProjectResponse",
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
      type: "ProjectResponse",
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

export const editProject = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("EditProject", {
      type: "ProjectResponse",
      args: {
        id: nonNull("Int"),
        title: "String",
        imageUrl: "String",
        desc: "String",
        githubURL: "String",
        websiteURL: "String",
      },
      // @ts-ignore
      async resolve(_, args, { db }) {
        try {
          const project = await db.project.findUnique({
            where: {
              id: args.id,
            },
          });

          const editedProject = await db.project.update({
            where: {
              id: args.id,
            },
            data: {
              title: args.title || project?.title,
              desc: args.desc || project?.desc,
              imageUrl: args.imageUrl || project?.imageUrl,
              githubURL: args.githubURL || project?.githubURL,
              websiteURL: args.websiteURL || project?.websiteURL,
            },
          });

          return {
            code: 200,
            message: "Project edit successful",
            success: true,
            project: editedProject,
          };
        } catch (error) {
          return {
            code: 400,
            message: "Project edit fail",
            success: false,
            project: null,
          };
        }
      },
    });
  },
});

export const deleteProject = extendType({
  type: "Mutation",
  definition(t) {
    t.boolean("DeleteProject", {
      args: {
        id: nonNull("Int"),
      },
      async resolve(_, { id }, { db }) {
        try {
          const deleteProject = await db.project.delete({
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
