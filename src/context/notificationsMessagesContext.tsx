import { createContext, useCallback, useContext, useReducer } from 'react';
import { ChatType } from './chatDataContext';

type ActionType =
  | { type: 'ADD_MESSAGE'; payload: ChatType }
  | { type: 'DELETE_MESSAGES'; payload: string };

type NotificationsMenagerResult = ReturnType<typeof NotificationsManager>;

const NotificationsContext = createContext<NotificationsMenagerResult>({
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

export const NotificationsProvider: React.FunctionComponent<{
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

export const useNewMessages = (): ChatType[] => {
  const { newMessages } = useContext(NotificationsContext);
  return newMessages;
};

export const useAddNotificationMessage =
  (): NotificationsMenagerResult['addNotificationMessage'] => {
    const { addNotificationMessage } = useContext(NotificationsContext);
    return addNotificationMessage;
  };

export const useDeleteNotificationMessages =
  (): NotificationsMenagerResult['deleteNewMessages'] => {
    const { deleteNewMessages } = useContext(NotificationsContext);
    return deleteNewMessages;
  };
