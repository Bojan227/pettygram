import {
  createContext,
  useCallback,
  useReducer,
  useContext,
  useEffect,
} from "react";
import { UserType } from "./userContext";
import { socket } from "../constants/socket";
import { useCookies } from "react-cookie";

type ActionType =
  | { type: "ADD_NOTIFICATIONS"; payload: Notification[] }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "FILTER_NOTIFICATIONS" };

export interface Notification {
  sender: UserType;
  message: string;
  receiver: string;
  action: "like" | "follow";
  read: boolean;
  createdAt: string;
}

type NotificationsManagerResult = ReturnType<typeof notificationsManager>;

const NotificationsContext = createContext<NotificationsManagerResult>({
  notifications: [],
  addNotifications: () => {},
  addNotification: () => {},
  filterNotifications: () => {},
});

function notificationsManager(initialData: Notification[]): {
  notifications: Notification[];
  addNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  filterNotifications: () => void;
} {
  const [notifications, dispatch] = useReducer(
    (state: Notification[], action: ActionType) => {
      switch (action.type) {
        case "ADD_NOTIFICATIONS":
          return action.payload;
        case "ADD_NOTIFICATION":
          return [...state, action.payload];
        case "FILTER_NOTIFICATIONS":
          return state.map((notification) => ({ ...notification, read: true }));
        default:
          return state;
      }
    },
    initialData
  );
  const addNotifications = useCallback((notifications: Notification[]) => {
    dispatch({ type: "ADD_NOTIFICATIONS", payload: notifications });
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });
  }, []);

  const filterNotifications = useCallback(() => {
    dispatch({ type: "FILTER_NOTIFICATIONS" });
  }, []);

  return {
    notifications,
    addNotification,
    filterNotifications,
    addNotifications,
  };
}

export const NotificationsProvider: React.FunctionComponent<{
  initialNotificationsData: Notification[];
  children: React.ReactNode;
}> = ({ initialNotificationsData, children }) => {
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies?.user?.id) {
      socket.emit("add_user", { userId: cookies?.user?.id });
    }

    return () => socket.emit("remove_user", { userId: cookies?.user?.id });
  }, [cookies?.user?.id]);

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

export const useAddNotifications =
  (): NotificationsManagerResult["addNotifications"] => {
    const { addNotifications } = useContext(NotificationsContext);
    return addNotifications;
  };

export const useAddNotification =
  (): NotificationsManagerResult["addNotification"] => {
    const { addNotification } = useContext(NotificationsContext);
    return addNotification;
  };

export const useFilterNotifications =
  (): NotificationsManagerResult["filterNotifications"] => {
    const { filterNotifications } = useContext(NotificationsContext);
    return filterNotifications;
  };
