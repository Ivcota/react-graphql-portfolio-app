import { objectType } from "nexus";

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

// Queries
