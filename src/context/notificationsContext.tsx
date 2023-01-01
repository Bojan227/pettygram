import { createContext, useCallback, useReducer, useContext } from 'react';

type ActionType =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'DELETE_NOTIFICATIONS' };

interface Notification {
  senderId: string;
  message: string;
  receiverId: string;
  action: 'like' | 'follow';
}

type NotificationsManagerResult = ReturnType<typeof notificationsManager>;

const NotificationsContext = createContext<NotificationsManagerResult>({
  notifications: [],
  addNotification: () => {},
  deleteNotifications: () => {},
});

function notificationsManager(initialData: Notification[]): {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  deleteNotifications: () => void;
} {
  const [notifications, dispatch] = useReducer(
    (state: Notification[], action: ActionType) => {
      switch (action.type) {
        case 'ADD_NOTIFICATION':
          return [...state, action.payload];
        case 'DELETE_NOTIFICATIONS':
          return [];
        default:
          return state;
      }
    },
    initialData
  );

  const addNotification = useCallback((notification: Notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  }, []);

  const deleteNotifications = useCallback(() => {
    dispatch({ type: 'DELETE_NOTIFICATIONS' });
  }, []);

  return { notifications, addNotification, deleteNotifications };
}

export const NotificationsProvider: React.FunctionComponent<{
  initialNotificationsData: Notification[];
  children: React.ReactNode;
}> = ({ initialNotificationsData, children }) => {
  return (
    <NotificationsContext.Provider
      value={notificationsManager(initialNotificationsData)}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
export const useNotifications = (): Notification[] => {
  const { notifications } = useContext(NotificationsContext);
  return notifications;
};

export const useAddNotification =
  (): NotificationsManagerResult['addNotification'] => {
    const { addNotification } = useContext(NotificationsContext);
    return addNotification;
  };

export const useDeleteNotifications =
  (): NotificationsManagerResult['deleteNotifications'] => {
    const { deleteNotifications } = useContext(NotificationsContext);
    return deleteNotifications;
  };
