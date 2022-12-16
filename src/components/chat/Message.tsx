import useUserContext from '../../hooks/useUserContext';
import { MessageProps } from './types';
import { useEffect, useRef } from 'react';
import { useChatData } from '../../context/chatDataContext';

export default function Message({
  message,
  senderId,
  selectedUser,
}: MessageProps) {
  const userContext = useUserContext();
  const chatData = useChatData();
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatData]);

  return (
    <div
      className={`chat-box ${
        userContext?.user._id === senderId ? 'user' : 'guest'
      }`}
      ref={bottomRef}
    >
      <img src={userContext?.user.imageUrl} />
      <h3>{message}</h3>
    </div>
  );
}
