import { PostCard } from "./PostCard";
import { useEffect, useState, useRef, useCallback } from "react";
import { useGetUsers } from "../../hooks/useGetUsers";
import useUserContext from "../../hooks/useUserContext";
import "./feed.css";
import { UserCard } from "../UserCard";
import { socket } from "../../constants/socket";
import { usePostsStore } from "../../store/postsStore";
import { useGetPosts } from "../../hooks/useGetPosts";
import LoadingSpinner from "../LoadingSpinner";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";
import FactContainer from "./FactContainer";
import RecipeModal from "./RecipeModal";
import ProfileCard from "./ProfileCard";
import SuggestedUserSkeleton from "./SuggestedUserSkeleton";

export const FeedContainer = () => {
  const { getUsers, isLoading, users } = useGetUsers();
  const userContext = useUserContext();
  const { posts, numberOfPosts } = usePostsStore();
  const { isLoadingState, error } = useGetPosts();
  const [page, setPage] = useState(0);
  const { isLoadingPagination, errorPagination } = useInfiniteScrolling(page);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

  let observer = useRef<IntersectionObserver | null>(null);
  let listRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingPagination) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && numberOfPosts > posts?.length) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [numberOfPosts > posts?.length]
  );

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (userContext?.user._id) {
      socket.emit("add_user", { userId: userContext?.user?._id });
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
    <main
      className="feed-container"
      onClick={() => setIsRecipeModalOpen(false)}
    >
      {error && <h1>{error}</h1>}
      <section>
        {filteredUsers?.length === 0 ? (
          <ProfileCard />
        ) : (
          <div className="suggested-users">
            <div className="suggested-header">
              <h1>Suggestions for you</h1>
            </div>
            {isLoading
              ? [1, 2, 3, 4, 5, 6].map(() => <SuggestedUserSkeleton />)
              : filteredUsers?.map(({ imageUrl, username, _id }) => (
                  <UserCard key={_id} {...{ imageUrl, username, _id }} />
                ))}
          </div>
        )}
        <FactContainer />
        <div
          className="recipe-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setIsRecipeModalOpen(true);
          }}
        >
          <h2>Pettygram Recipe of the Day</h2>
          <p>Author: Unknown</p>
        </div>
        <RecipeModal {...{ isRecipeModalOpen }} />
      </section>

      <div>
        {posts
          ? posts?.map((post, i) => (
              <PostCard key={i} {...post} index={i} {...{ listRef }} />
            ))
          : null}
      </div>

      {isLoadingPagination && <LoadingSpinner />}
      {errorPagination && <h1>{errorPagination}</h1>}
    </main>
  );
};
