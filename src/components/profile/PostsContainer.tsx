import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post } from '../feed/types/feedTypes';
import fetcher from '../../api/fetcher';
import ImageOverlay from './ImageOverlay';
import { v4 as uuidv4 } from 'uuid';

export const PostsContainer = ({ tab }: { tab: string }) => {
  const [data, setData] = useState<Post[] | null>([]);
  const [error, setError] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    const getDataByUserId = async () => {
      try {
        const data = await fetcher(
          `http://localhost:4000/${tab}/${tab === 'saved' ? '' : userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${
                document.cookie
                  ?.split('; ')
                  ?.find((value) => value?.includes('token'))
                  ?.split('=')[1]
              }`,
            },
          }
        );

        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    getDataByUserId();
  }, [tab, userId]);

  return (
    <div className="posts-container">
      {data?.length === 0 && tab !== 'saved' && <h1>Create your first post</h1>}
      {data?.length === 0 && tab === 'saved' && (
        <h1>You haven't saved any post</h1>
      )}

      {data &&
        data.map(({ imageUrl, likes, _id }) => (
          <Link key={uuidv4()} to={`/p/${_id}`}>
            <ImageOverlay {...{ likes }}>
              <img src={imageUrl[0]} alt="user-image" />
            </ImageOverlay>
          </Link>
        ))}
      {error && <h1>{error}</h1>}
    </div>
  );
};
