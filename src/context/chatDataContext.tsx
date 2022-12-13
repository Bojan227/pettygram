import { createContext, useCallback, useReducer, useContext } from 'react';

export interface ChatType {
  message: string;
  senderId: string | undefined;
  time: string;
  receiverId: string | undefined;
  members: (string | undefined)[];
}

type ActionType =
  | { type: 'ADD'; chatHistory: ChatType[] }
  | { type: 'ADD_NEW'; message: ChatType };

type ChatDataManagerResult = ReturnType<typeof ChatDataManager>;

const ChatDataContext = createContext<ChatDataManagerResult>({
  chatData: [],
  addChatHistory: () => {},
  addMessage: () => {},
});

function ChatDataManager(initialData: ChatType[]): {
  chatData: ChatType[];
  addChatHistory: (chatHistory: ChatType[]) => void;
  addMessage: (message: ChatType) => void;
} {
  const [chatData, dispatch] = useReducer(
    (state: ChatType[], action: ActionType) => {
      switch (action.type) {
        case 'ADD':
          return action.chatHistory;
        case 'ADD_NEW':
          return [...state, action.message];
        default:
          return state;
      }
    },
    initialData
  );
  const addChatHistory = useCallback((chatHistory: ChatType[]) => {
    dispatch({ type: 'ADD', chatHistory });
  }, []);

  const addMessage = useCallback((message: ChatType) => {
    dispatch({ type: 'ADD_NEW', message });
  }, []);

  return { chatData, addChatHistory, addMessage };
}

export const ChatDataProvider: React.FunctionComponent<{
  initialChatData: ChatType[];
  children: React.ReactNode;
}> = ({ initialChatData, children }) => {
  return (
    <ChatDataContext.Provider value={ChatDataManager(initialChatData)}>
      {children}
    </ChatDataContext.Provider>
  );
};

export const useChatData = (): ChatType[] => {
  const { chatData } = useContext(ChatDataContext);
  return chatData;
};

export const useAddChatData = (): ChatDataManagerResult['addChatHistory'] => {
  const { addChatHistory } = useContext(ChatDataContext);
  return addChatHistory;
};

export const useAddMessage = (): ChatDataManagerResult['addMessage'] => {
  const { addMessage } = useContext(ChatDataContext);
  return addMessage;
};
