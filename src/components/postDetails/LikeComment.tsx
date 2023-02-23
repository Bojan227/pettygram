import { LikeButton } from '../feed/SvgsContainer';
import { url } from '../../constants/api';
import useUserContext from '../../hooks/useUserContext';
import { Dispatch, SetStateAction } from 'react';
import { Comments } from './types';

export default function LikeComment({
  likes,
  _id,
  setComments,
}: {
  likes: string[];
  _id: string;
  setComments: Dispatch<SetStateAction<Comments[]>>;
}) {
  const userContext = useUserContext();

  const updateComments = () => {
    setComments((prevComments) =>
      prevComments?.map((comments) =>
        comments._id === _id
          ? {
              ...comments,
              likes: comments.likes.find(
                (like) => like === userContext?.user._id
              )
                ? comments.likes.filter(
                    (like) => like !== userContext?.user._id
                  )
                : [...comments.likes, userContext?.user._id!],
            }
          : comments
      )
    );
  };

  return (
    <LikeButton
      {...{
        likes,
        postId: _id,
        updateComments,
        url: `${url}/comments/`,
      }}
    />
  );
}
