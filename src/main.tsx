import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';
import { ChatDataProvider } from './context/chatDataContext';
import { NotificationsProvider } from './context/notificationsMessagesContext';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <NotificationsProvider initialNotificationsData={[]}>
        <ChatDataProvider initialChatData={[]}>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </ChatDataProvider>
      </NotificationsProvider>
    </React.StrictMode>
  </BrowserRouter>
);
