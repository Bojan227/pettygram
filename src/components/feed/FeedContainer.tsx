import { PostCard } from './PostCard';
import { useEffect, useState } from 'react';
import { useGetPosts } from '../../hooks/useGetPosts';
import useUserContenxt from '../../hooks/useUserContext';
import './feed.css';

export const FeedContainer = () => {
  const { posts, isLoading, message, getPosts, setPosts } = useGetPosts();
  const userContext = useUserContenxt();

  useEffect(() => {
    getPosts();
  }, []);

  const updateLike = async (id: string, userId: string) => {
    const findPost = posts?.find((post) => post._id === id);

    try {
      const res = await fetch('http://localhost:4000/posts/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${document.cookie.split('=')[1]}`,
        },
        body: JSON.stringify({
          _id: id,
          like: !findPost?.likes.find((id) => id === userContext?.user._id),
          userId,
        }),
      });

      const json = await res.json();

      setPosts((prevPosts) => {
        return prevPosts?.map((post) => {
          if (post._id === json.post._id) {
            return {
              ...json.post,
            };
          } else {
            return post;
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <main className="flex flex-col justify-center items-center p-11 gap-10 w-full min-h-screen ml-32">
      {message && <h1>{message}</h1>}
      {posts?.map((post, i) => {
        return (
          <PostCard
            key={i}
            {...post}
            updateLike={() => updateLike(post._id, post.createdBy._id)}
          />
        );
      })}
    </main>
  );
};
