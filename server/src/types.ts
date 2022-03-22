import { Request } from "express";

export interface User {
  id?: number;
  firstName?: string;
  email?: string;
}

export interface CustomRequest extends Request {}
