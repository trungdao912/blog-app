import { Author } from "./author.model";

export interface Comment {
  comments: {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Author;
  };
}
