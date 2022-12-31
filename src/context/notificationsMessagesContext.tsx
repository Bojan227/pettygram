import { createContext, useCallback, useContext, useReducer } from 'react';
import { ChatType } from './chatDataContext';

type ActionType =
  | { type: 'ADD_MESSAGE'; payload: ChatType }
  | { type: 'DELETE_MESSAGES' };

type NotificationsMenagerResult = ReturnType<typeof NotificationsManager>;

const NotificationsContext = createContext<NotificationsMenagerResult>({
  newMessages: [],
  addMessage: () => {},
  deleteMessages: () => {},
});

function NotificationsManager(initialData: ChatType[]): {
  newMessages: ChatType[];
  addMessage: (message: ChatType) => void;
  deleteMessages: () => void;
} {
  const [newMessages, dispatch] = useReducer(
    (messagesState: ChatType[], action: ActionType) => {
      switch (action.type) {
        case 'ADD_MESSAGE':
          return [...messagesState, action.payload];
        case 'DELETE_MESSAGES':
          return [];
        default:
          return messagesState;
      }
    },
    initialData
  );

  const addMessage = useCallback((message: ChatType) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  }, []);

  const deleteMessages = useCallback(() => {
    dispatch({ type: 'DELETE_MESSAGES' });
  }, []);

  return { newMessages, addMessage, deleteMessages };
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
  (): NotificationsMenagerResult['addMessage'] => {
    const { addMessage } = useContext(NotificationsContext);
    return addMessage;
  };

export const useDeleteNotificationMessages =
  (): NotificationsMenagerResult['deleteMessages'] => {
    const { deleteMessages } = useContext(NotificationsContext);
    return deleteMessages;
  };
