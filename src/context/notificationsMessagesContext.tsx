import { createContext, useCallback, useContext, useReducer } from 'react';
import { ChatType } from './chatDataContext';
import { UserType } from './userContext';

type ActionType =
  | { type: 'ADD_MESSAGE'; payload: ChatType }
  | { type: 'DELETE_MESSAGES'; payload: string };

type NotificationsManagerResult = ReturnType<typeof NotificationsManager>;

const NotificationsContext = createContext<NotificationsManagerResult>({
  newMessages: [],
  addNotificationMessage: () => {},
  deleteNewMessages: () => {},
});

function NotificationsManager(initialData: ChatType[]): {
  newMessages: ChatType[];
  addNotificationMessage: (message: ChatType) => void;
  deleteNewMessages: (userId: string) => void;
} {
  const [newMessages, dispatch] = useReducer(
    (messagesState: ChatType[], action: ActionType) => {
      switch (action.type) {
        case 'ADD_MESSAGE':
          return [...messagesState, action.payload];
        case 'DELETE_MESSAGES':
          return messagesState.filter(
            ({ senderId }) => senderId !== action.payload
          );
        default:
          return messagesState;
      }
    },
    initialData
  );

  const addNotificationMessage = useCallback((message: ChatType) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  }, []);

  const deleteNewMessages = useCallback((userId: string) => {
    dispatch({ type: 'DELETE_MESSAGES', payload: userId });
  }, []);

  return { newMessages, addNotificationMessage, deleteNewMessages };
}

export const useNewMessages = (): ChatType[] => {
  const { newMessages } = useContext(NotificationsContext);
  return newMessages;
};

export const useAddNotificationMessage =
  (): NotificationsManagerResult['addNotificationMessage'] => {
    const { addNotificationMessage } = useContext(NotificationsContext);
    return addNotificationMessage;
  };

export const useDeleteNotificationMessages =
  (): NotificationsManagerResult['deleteNewMessages'] => {
    const { deleteNewMessages } = useContext(NotificationsContext);
    return deleteNewMessages;
  };

export const NotificationMessagesProvider: React.FunctionComponent<{
  initialNotificationsData: ChatType[];
  children: React.ReactNode;
}> = ({ initialNotificationsData, children }) => {
  return (
    <NotificationsContext.Provider
      value={NotificationsManager(initialNotificationsData)}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
