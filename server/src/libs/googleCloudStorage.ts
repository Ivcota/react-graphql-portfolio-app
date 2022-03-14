import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
dotenv.config();

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: __dirname + "../../../coding-project-280415-fafcaff4c2c9.json",
});

export const bucket = storage.bucket(process.env.GCP_BUCKET_ID as string);
