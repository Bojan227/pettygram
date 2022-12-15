import { UserType } from '../../../context/userContext';

export interface ChatUserProps {
  imageUrl?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  setSelectedUser: () => void;
  selectedUser: UserType | undefined;
}

export type MessageProps = {
  message: string | undefined;
  senderId: string | undefined;
  selectedUser: UserType | undefined;
  index: number;
};
