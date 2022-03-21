import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { CustomRequest } from "./types";
const prisma = new PrismaClient();

export interface Context {
  db: PrismaClient;
  req: CustomRequest;
}

// Add the express request object to the context
// https://stackoverflow.com/questions/60905926/apolloserver-pass-headers-from-request-through-to-backend
export const context = async ({ req }: { req: Request }) => {
  return {
    req,
    db: prisma,
  } as Context;
};
