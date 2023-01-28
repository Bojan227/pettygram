import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';
import { ChatDataProvider } from './context/chatDataContext';
import { NotificationMessagesProvider } from './context/notificationsMessagesContext';
import { NotificationsProvider } from './context/notificationsContext';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <NotificationsProvider initialNotificationsData={[]}>
        <NotificationMessagesProvider initialNotificationsData={[]}>
          <ChatDataProvider initialChatData={[]}>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </ChatDataProvider>
        </NotificationMessagesProvider>
      </NotificationsProvider>
    </React.StrictMode>
  </BrowserRouter>
);
