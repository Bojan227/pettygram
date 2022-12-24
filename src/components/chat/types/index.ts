import { UserType } from '../../../context/userContext';

export interface ChatUserProps {
  imageUrl?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  setSelectedUser: () => void;
  selectedUser: UserType | undefined;
  _id?: string | undefined;
}

export type MessageProps = {
  message: string | undefined;
  senderId: string | undefined;
  selectedUser: UserType | undefined;
  index: number;
};

export type OnlineUsersData = {
  userId: string;
  socketId: string;
};
