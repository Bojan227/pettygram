import { createContext, useCallback, useReducer, useContext } from 'react';
import { UserType } from './userContext';

type ActionType =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'FILTER_NOTIFICATIONS' };

export interface Notification {
  senderId: UserType;
  message: string;
  receiverId: string;
  action: 'like' | 'follow';
  read: boolean;
}

type NotificationsManagerResult = ReturnType<typeof notificationsManager>;

const NotificationsContext = createContext<NotificationsManagerResult>({
  notifications: [],
  addNotification: () => {},
  filterNotifications: () => {},
});

function notificationsManager(initialData: Notification[]): {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  filterNotifications: () => void;
} {
  const [notifications, dispatch] = useReducer(
    (state: Notification[], action: ActionType) => {
      switch (action.type) {
        case 'ADD_NOTIFICATION':
          return [...state, action.payload];
        case 'FILTER_NOTIFICATIONS':
          return state.map((notification) => ({ ...notification, read: true }));
        default:
          return state;
      }
    },
    initialData
  );

  const addNotification = useCallback((notification: Notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  }, []);

  const filterNotifications = useCallback(() => {
    dispatch({ type: 'FILTER_NOTIFICATIONS' });
  }, []);

  return { notifications, addNotification, filterNotifications };
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

export const useFilterNotifications =
  (): NotificationsManagerResult['filterNotifications'] => {
    const { filterNotifications } = useContext(NotificationsContext);
    return filterNotifications;
  };
