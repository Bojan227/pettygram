import { Dispatch, SetStateAction } from 'react';

export type PostCardProps = {
  createdBy: {
    imageUrl: string;
    username: string;
    _id: string;
  };
  likes: string[];
  imageUrl: [string];
  text: string;
  createdAt: string;
  _id: string;
  index: number;
  listRef: (node: HTMLDivElement | null) => void;
};

export interface FeedContainerProps {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[] | undefined>>;
  error: string;
}

export interface Post {
  _id: string;
  text: string;
  imageUrl: [string];
  imageId: [string];
  createdAt: string;
  likes: [string];
  createdBy: {
    imageUrl: string;
    username: string;
    _id: string;
  };
}
export type LikeButtonProps = {
  likes: String[];
  receiverId?: string;
  postId: string;
  updateComments?: () => void;
  url: string;
};
