import { Author } from "./author.model";

export interface ArticleInfor {
  author: Author;
  body: string;
  createdAt:string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug:string;
  tagList: [];
  title: string;
  updatedAt:string;
}
