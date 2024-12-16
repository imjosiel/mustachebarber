/* eslint-disable no-unused-vars */
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role?: string; // Adicione esta linha
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string; // Adicione esta linha
  }
}
