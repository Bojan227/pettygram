import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';
import { ChatDataProvider } from './context/chatDataContext';
import { NotificationMessagesProvider } from './context/notificationsMessagesContext';
import { NotificationsProvider } from './context/notificationsContext';
import LocationProvider from './context/locationContext';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <NotificationsProvider initialNotificationsData={[]}>
        <NotificationMessagesProvider initialNotificationsData={[]}>
          <ChatDataProvider initialChatData={[]}>
            <UserContextProvider>
              <LocationProvider initialLocation="/">
                <App />
              </LocationProvider>
            </UserContextProvider>
          </ChatDataProvider>
        </NotificationMessagesProvider>
      </NotificationsProvider>
    </React.StrictMode>
  </BrowserRouter>
);
