import './App.css';
import { useEffect, useState } from 'react';
import { FeedContainer } from './components/feed/FeedContainer';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { NavigationBar } from './components/navigation/NavigationBar';
import { Profile } from './components/profile/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import useUserContenxt from './hooks/useUserContext';
import { PostsContainer } from './components/profile/PostsContainer';
import { PostDetails } from './components/postDetails/PostDetails';
import { EditInfo } from './components/profile/EditUserInfo';
import ChatContainer from './components/chat/ChatContainer';
import NotificationMessagesWrapper from './components/NotificationMessagesWrapper';
import NotificationsWrapper from './components/NotificationsWrapper';
import ExploreContainer from './components/explore/ExploreContainer';
import { useRemoveLocation } from './context/locationContext';
import { useAddLocation } from './context/locationContext';

function App() {
  const [toggleNotifications, setToggleNotifications] = useState(false);
  const userContext = useUserContenxt();
  const location = useLocation();

  const addLocation = useAddLocation();
  const removeLocation = useRemoveLocation();

  useEffect(() => {
    if (location.pathname.split('/').includes('profile')) {
      addLocation(location.pathname);
    } else if (!location.pathname.split('/').includes('p')) {
      removeLocation();
    }
  }, [location.pathname]);

  return (
    <div onClick={() => setToggleNotifications(false)}>
      {userContext?.user && (
        <NavigationBar {...{ toggleNotifications, setToggleNotifications }} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            userContext?.user ? (
              <NotificationsWrapper>
                <NotificationMessagesWrapper>
                  <FeedContainer />
                </NotificationMessagesWrapper>
              </NotificationsWrapper>
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="login"
          element={userContext?.user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="profile/:userId/"
          element={
            userContext?.user && (
              <NotificationMessagesWrapper>
                <Profile />
              </NotificationMessagesWrapper>
            )
          }
        >
          <Route
            path="/profile/:userId/"
            element={<PostsContainer tab="posts" />}
          />
          <Route
            path="/profile/:userId/saved"
            element={<PostsContainer tab="saved" />}
          />
          <Route
            path="/profile/:userId/tagged"
            element={<PostsContainer tab="tagged" />}
          />
        </Route>
        <Route path="/p/:id" element={<PostDetails />} />
        <Route path="/edit" element={<EditInfo />} />
        {userContext?.user && (
          <Route path="/inbox" element={<ChatContainer />} />
        )}

        <Route path="/explore" element={<ExploreContainer />} />
      </Routes>
    </div>
  );
}

export default App;
