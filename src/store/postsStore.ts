import { create } from 'zustand';
import { Post } from '../components/feed/types/feedTypes';

type PostsStore = {
  posts: Post[];
  numberOfPosts: number;
  addPost: (post: Post) => void;
  load: (posts: Post[]) => void;
  changeLikeState: (post: Post) => void;
  pagination: (posts: Post[]) => void;
  setNumberOfPosts: (numberOfPosts: number) => void;
};

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  numberOfPosts: 0,
  addPost: (post) =>
    set((state) => ({
      ...state,
      posts: [...state.posts, post],
    })),
  load: (posts) =>
    set((state) => ({
      ...state,
      posts: posts,
    })),
  changeLikeState: (post) =>
    set((state) => ({
      ...state,
      posts: state.posts.map((prevPost) =>
        prevPost._id === post._id ? post : prevPost
      ),
    })),
  pagination: (posts) =>
    set((state) => ({
      ...state,
      posts: [...state.posts, ...posts],
    })),
  setNumberOfPosts: (numberOfPosts) =>
    set((state) => ({
      ...state,
      numberOfPosts,
    })),
}));
