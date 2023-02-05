import { PostCard } from './PostCard';
import { useEffect, useState, useRef, useCallback, ReactElement } from 'react';
import { useGetUsers } from '../../hooks/useGetUsers';
import useUserContext from '../../hooks/useUserContext';
import './feed.css';
import { UserCard } from '../UserCard';
import { socket } from '../../constants/socket';
import { usePostsStore } from '../../store/postsStore';
import { useGetPosts } from '../../hooks/useGetPosts';
import LoadingSpinner from '../LoadingSpinner';
import useInfiniteScrolling from '../../hooks/useInfiniteScrolling';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';

export const FeedContainer = () => {
  const { getUsers, isLoading, users } = useGetUsers();
  const userContext = useUserContext();
  const { posts, numberOfPosts } = usePostsStore();
  const { isLoadingState, error } = useGetPosts();
  const [page, setPage] = useState(0);
  const { isLoadingPagination, errorPagination } = useInfiniteScrolling(page);
  const [isBottom, setIsBottom] = useState(false);

  // const handleScroll = (e: Event) => {
  //   const bottom =
  //     e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  //   if (bottom) {
  //     console.log('bottom');
  //   }
  // };

  let observer = useRef<IntersectionObserver | null>(null);
  let listRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingPagination) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && numberOfPosts > posts.length) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [numberOfPosts > posts.length]
  );

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (userContext?.user._id) {
      socket.emit('add_user', { userId: userContext?.user?._id });
    }
  }, []);

  const filteredUsers = users?.filter(
    (user) =>
      user._id !== userContext?.user._id &&
      !userContext?.user?.following?.find(
        (userToFollow) => userToFollow?._id === user._id
      )
  );

  if (isLoadingState) return <LoadingSpinner />;

  return (
    <main className="feed-container">
      {error && <h1>{error}</h1>}
      {posts?.map((post, i) => (
        <PostCard key={i} {...post} index={i} {...{ listRef }} />
      ))}
      {filteredUsers?.length === 0 ? null : isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="suggested-users">
          <div className="suggested-header">
            <h1>Discover People</h1>
          </div>
          {filteredUsers?.map(({ imageUrl, firstName, lastName, _id }) => (
            <UserCard key={_id} {...{ imageUrl, firstName, lastName, _id }} />
          ))}
        </div>
      )}
      {isLoadingPagination && <LoadingSpinner />}
      {errorPagination && <h1>{errorPagination}</h1>}
    </main>
  );
};
