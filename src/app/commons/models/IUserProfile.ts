import { IArticle } from './IArticle';
import { IUserDetails } from './IUserDetails';

export interface IUserProfile {
  username: string;
  bio: string;
  image: string;
  following: IUserDetails[];
  favorites: IArticle[];
}
