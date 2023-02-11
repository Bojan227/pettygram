import { LikeButton } from '../feed/SvgsContainer';
import { url } from '../../constants/api';
import useUpdateLike from '../../hooks/useUpdateLike';
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
  const { updateLike } = useUpdateLike();
  const userContext = useUserContext();
  
  return (
    <LikeButton
      {...{
        likes,
        updateLike: () => {
          updateLike({
            url: `${url}/comments/`,
            _id,
          }),
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
        },
      }}
    />
  );
}
