import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post } from '../feed/types/feedTypes';
import fetcher from '../../api/fetcher';
import ImageOverlay from './ImageOverlay';

export const PostsContainer = ({ tab }: { tab: string }) => {
  const [data, setData] = useState<Post[] | null>([]);
  const [error, setError] = useState('');
  const { userId } = useParams();
  const [showOverlay, setShowOverlay] = useState(false);

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
        data.map(({ imageUrl, likes, _id }, i) => {
          return (
            <Link key={i} to={`/p/${_id}`}>
              <div
                className="profile-post-image"
                onMouseEnter={() => setShowOverlay(true)}
              >
                <img src={imageUrl[0]} alt="user-image" />
                <ImageOverlay {...{ showOverlay, setShowOverlay, likes }} />
              </div>
            </Link>
          );
        })}
      {error && <h1>{error}</h1>}
    </div>
  );
};
