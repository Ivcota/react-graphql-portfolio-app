import { extendType, nonNull, objectType } from "nexus";
import { FileUpload } from "./../../node_modules/@types/graphql-upload/index.d";

export const FileResponse = objectType({
  name: "FileResponse",
  definition(t) {
    t.string("filename");
    t.nonNull.string("fileURL");
    t.nonNull.boolean("success");
  },
});

// export const uploadFile = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.nonNull.field("UploadFile", {
//       type: "FileResponse",
//       args: {
//         file: nonNull("Upload"),
//       },
//       resolve: async (_, { file }, { db }) => {
//         try {
//           const { createReadStream, filename, mimetype, encoding } =
//             (await file) as FileUpload;
//         } catch (error) {}
//       },
//     });
//   },
// });
