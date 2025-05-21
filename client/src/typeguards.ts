import { type Post } from "./types";

export const isPost = (data: unknown): data is Post => {
  if (
    data !== null &&
    typeof data === "object" &&
    data.hasOwnProperty("title")
  ) {
    return true;
  }
  return false;
};