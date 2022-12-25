import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { socket } from '../../constants/socket';
import { ChatType } from '../../context/chatDataContext';
import useUserContext from '../../hooks/useUserContext';

type NavigationLinkProps = {
  title: string;
  link: string;
  url: string | undefined;
  toggleCreatePost: () => void;
};

export const NavigationLink = ({
  title,
  link,
  url,
  toggleCreatePost,
}: NavigationLinkProps): JSX.Element => {
  const userContext = useUserContext();
  const [newMessages, setNewMessages] = useState<ChatType[]>([]);
  useEffect(() => {
    socket.on('receive_message', (data: ChatType) => {
      console.log(data);
      setNewMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  return (
    <Link
      to={link === 'profile' ? `${link}/${userContext?.user._id}` : link}
      className={
        (title === 'Notifications' ? 'notification-link' : '') ||
        (title === 'Profile' ? 'profile-link' : '')
      }
      onClick={() =>
        (title === 'Create' && toggleCreatePost()) ||
        (title === 'Messages' && setNewMessages([]))
      }
    >
      <li>
        <div>
          <img
            src={`${url === 'profile' ? userContext?.user.imageUrl : url}`}
            alt="img"
          />
          {title === 'Messages' &&
            (newMessages.length === 0 ? null : (
              <div className="notification-msg">{newMessages.length}</div>
            ))}
        </div>
        <h3>{title}</h3>
      </li>
    </Link>
  );
};
