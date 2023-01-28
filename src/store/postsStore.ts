import { create } from 'zustand';
import { Post } from '../components/feed/types/feedTypes';

type PostsStore = {
  posts: Post[];
  addPost: (post: Post) => void;
  load: (posts: Post[]) => void;
  changeLikeState: (post: Post) => void;
};

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  addPost: (post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),
  load: (posts) =>
    set(() => ({
      posts: posts,
    })),
  changeLikeState: (post) =>
    set((state) => ({
      posts: state.posts.map((prevPost) =>
        prevPost._id === post._id ? post : prevPost
      ),
    })),
}));

// export const { addPost } = usePosts();
// export const { posts } = usePosts();
// export const { load } = usePosts();
