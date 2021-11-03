import { IComment } from './IComment';
import { IUserDetails } from './IUserDetails';

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  comments: IComment[];
  author: IUserDetails;
}
