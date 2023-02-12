import { useEffect, useState } from 'react';

import { useCurrentLocation } from '../../context/locationContext';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Post } from '../feed/types/feedTypes';
import { useGetData } from '../../hooks/useGetData';
import { url } from '../../constants/api';

export default function PostsViewer({
  setPost,
  post,
}: {
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
  post: Post | undefined;
}) {
  const locationContext = useCurrentLocation();
  const [posts, setPosts] = useState<Post[]>([]);
  const { getData } = useGetData();

  useEffect(() => {
    if (locationContext.split('/').includes('profile')) {
      getData({
        url: `${url}/posts/${locationContext.split('/')[2]}`,
        setState: setPosts,
        options: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              document.cookie
                ?.split('; ')
                ?.find((value) => value?.includes('token'))
                ?.split('=')[1]
            }`,
          },
        },
      });
    }
  }, []);

  const previousPost = () => {
    setPost(
      posts.findIndex(({ _id }) => _id === post?._id) === 0
        ? posts[posts.length - 1]
        : posts[posts.findIndex(({ _id }) => _id === post?._id) - 1]
    );
  };

  const nextPost = () => {
    setPost(
      posts.findIndex(({ _id }) => _id === post?._id) + 1 === posts.length
        ? posts[0]
        : posts[posts.findIndex(({ _id }) => _id === post?._id) + 1]
    );
  };

  return locationContext.split('/').includes('profile') ? (
    <>
      <ArrowLeftCircleIcon className="left-arrow" onClick={previousPost} />
      <ArrowRightCircleIcon className="right-arrow" onClick={nextPost} />
    </>
  ) : null;
}
