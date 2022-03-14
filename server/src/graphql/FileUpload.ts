import { extendType, nonNull, objectType } from "nexus";
import { bucket } from "../libs/googleCloudStorage";
import { FileUpload } from "./../../node_modules/@types/graphql-upload/index.d";

export const FileResponse = objectType({
  name: "FileResponse",
  definition(t) {
    t.string("filename");
    t.nonNull.string("fileURL");
    t.nonNull.boolean("success");
  },
});

export const uploadFile = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("UploadFile", {
      type: "FileResponse",
      args: {
        file: nonNull("Upload"),
      },
      resolve: async (_, { file }, { db }) => {
        try {
          const { createReadStream, filename, mimetype, encoding } =
            (await file) as FileUpload;

          await new Promise((resolve, reject) => {
            createReadStream().pipe(
              bucket
                .file(filename)
                .createWriteStream({
                  resumable: false,
                  gzip: true,
                })
                .on("error", (err) => reject(err))
                .on("finish", resolve)
            );
          });

          console.log("done");

          return {
            success: true,
            fileURL: `https://storage.googleapis.com/${process.env.GCP_BUCKET_ID}/${filename}`,
          };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            fileURL: "",
          };
        }
      },
    });
  },
});
