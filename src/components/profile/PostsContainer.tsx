import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post } from '../feed/types/feedTypes';
import fetcher from '../../api/fetcher';
import ImageOverlay from './ImageOverlay';
import { v4 as uuidv4 } from 'uuid';
import { url } from '../../constants/api';
import LoadingSpinner from '../LoadingSpinner';
import useUserContext from '../../hooks/useUserContext';
import EmptyState from './EmptyState';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const PostsContainer = ({ tab }: { tab: string }) => {
  const [data, setData] = useState<Post[] | null>([]);
  const [error, setError] = useState('');
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useUserContext();

  useEffect(() => {
    const getDataByUserId = async () => {
      setIsLoading(true);
      try {
        const data = await fetcher(
          `${url}/${tab}/${tab === 'saved' ? '' : userId}`,
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
      } finally {
        setIsLoading(false);
      }
    };

    getDataByUserId();
  }, [tab, userId]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className={`${
        data?.length === 0 ? 'empty-container' : 'posts-container'
      }`}
    >
      {data?.length === 0 && tab === 'saved' && (
        <p>Only you can see what you've saved</p>
      )}
      {data?.length === 0 && tab !== 'saved' ? (
        <EmptyState {...{ isLoggedUser: userContext?.user._id === userId }} />
      ) : null}

      {data &&
        data.map(({ imageUrl, likes, _id }) => (
          <Link key={uuidv4()} to={`/p/${_id}`}>
            <ImageOverlay {...{ likes }}>
              {/* <img src={imageUrl[0]} alt="user-image" /> */}
              <LazyLoadImage src={imageUrl[0]} effect="blur" />
            </ImageOverlay>
          </Link>
        ))}
      {error && <h1>{error}</h1>}
    </div>
  );
};
