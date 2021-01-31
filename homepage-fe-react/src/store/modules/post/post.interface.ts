import { IAttachment } from '../attachment/attachment.interface';
import { IUser } from '../user/user.interface';

export interface IPost {
  id?: number;
  title: string;
  desc: string;
  subject: string;
  subjectTitle?: string;
  subjectOrder?: number;
  content: string;
  contentHtml: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: IUser;
  categories?: [];
  attachment?: IAttachment;
}

export interface ICategory {
  id?: number;
  name: string;
}

export interface IPostRequest {
  id?: number;
  title: string;
  desc: string;
  subject: string;
  subjectTitle?: string;
  subjectOrder?: number;
  content: string;
  contentHtml: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: IUser;
  categories?: ICategory[];
  attachment?: IAttachment;
}

export interface IPostsResponse {
  data: IPost[];
  result: {
    code: string | null;
    message: string | null;
  };
}

export interface IPostResponse {
  data: IPost;
  result: {
    code: string | null;
    message: string | null;
  };
}

export interface IPostState {
  isLoadingReadPosts: boolean;
  isDoneReadPosts: boolean;
  errorReadPosts: string | null;
  posts: IPost[];

  isLoadingReadPost: boolean;
  isDoneReadPost: boolean;
  errorReadPost: string | null;
  post?: IPost;

  isLoadingAddPost: boolean;
  isDoneAddPost: boolean;
  errorAddPost: string | null;

  isLoadingUpdatePost: boolean;
  isDoneUpdatePost: boolean;
  errorUpdatePost: string | null;

  isLoadingRemovePost: boolean;
  isDoneRemovePost: boolean;
  errorRemovePost: string | null;
}
