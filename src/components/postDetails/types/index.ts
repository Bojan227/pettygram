import { SetStateAction, Dispatch } from 'react';
import { Post } from '../../feed/types/feedTypes';

export type CommentsContainerProps = {
  commentNotification: (value: string) => void;
  commentMessage: string;
};

export interface Comments {
  comment: string;
  post: string;
  createdBy: {
    _id: string;
    username: string;
    imageUrl: string;
  };
  createdAt: string;
  likes: string[];
  _id: string;
}

export type CommentsCardProps = {
  createdBy: {
    _id: string;
    imageUrl: string;
    username: string;
  };
  comment: string;
  createdAt: string;
  likes: string[];
  _id: string;
  setComments: Dispatch<SetStateAction<Comments[] | undefined>>;
};

export interface PostDetailsProps {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[] | undefined>>;
  isLoading: boolean;
}
