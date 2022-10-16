import { PostCard } from './PostCard';
import { useEffect, useState } from 'react';
import useUserContenxt from '../../hooks/useUserContext';
import './feed.css';

export interface Posts {
  _id: string;
  text: string;
  imageUrl: string;
  imageId: string;
  createdAt: string;
  likes: [string];
  createdBy: {
    imageUrl: string;
    username: string;
    _id: string;
  };
}

export const FeedContainer = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const userContext = useUserContenxt();

  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:4000/posts/');
        const json = await res.json();

        setPosts([...json]);
      } catch (error) {
        setError('No posts available');
      } finally {
        setIsLoading(false);
      }
    }

    getPosts();
  }, []);

  const updateLike = async (id: string, userId: string) => {
    const findPost = posts.find((post) => post._id === id);
    console.log(!findPost?.likes.find((id) => id === userContext?.user._id));
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
      console.log(json);

      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
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
      {posts.map((post, i) => {
        return (
          <PostCard
            key={i}
            likes={post.likes}
            description={post.text}
            createdAt={post.createdAt}
            createdBy={post.createdBy}
            images={post.imageUrl}
            updateLike={() => updateLike(post._id, post.createdBy._id)}
          />
        );
      })}
    </main>
  );
};
