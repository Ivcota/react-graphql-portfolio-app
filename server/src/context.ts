import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface Context {
  db: PrismaClient;
}

export const context = async () => {
  return {
    db: prisma,
  } as Context;
};
