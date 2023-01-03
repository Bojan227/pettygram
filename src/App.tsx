import './App.css';
import { useEffect, useState } from 'react';
import { FeedContainer } from './components/feed/FeedContainer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from './components/navigation/NavigationBar';
import { Profile } from './components/profile/Profile';
import { useGetPosts } from './hooks/useGetPosts';
import Signup from './components/Signup';
import Login from './components/Login';
import useUserContenxt from './hooks/useUserContext';
import { PostsContainer } from './components/profile/PostsContainer';
import { PostDetails } from './components/postDetails/PostDetails';
import { EditInfo } from './components/profile/EditUserInfo';
import ChatContainer from './components/chat/ChatContainer';
import NotificationsContainer from './components/notifications/NotificationsContainer';
import NotificationMessagesWrapper from './components/NotificationMessagesWrapper';
import NotificationsWrapper from './components/NotificationsWrapper';

function App() {
  const userContext = useUserContenxt();
  const { posts, getPosts, error, isLoading, setPosts } = useGetPosts();
  const [toggleNotifications, setToggleNotifications] = useState(false);

  useEffect(() => {
    getPosts();
  }, [userContext?.user?.username]);

  return (
    <div
      className={`${
        userContext?.user ? 'flex bg-stone-50 justify-center min-h-screen' : ''
      }`}
      onClick={() => setToggleNotifications(false)}
    >
      {userContext?.user && (
        <NavigationBar
          {...{ setPosts, toggleNotifications, setToggleNotifications }}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            userContext?.user ? (
              posts && (
                <NotificationsWrapper>
                  <NotificationMessagesWrapper>
                    <FeedContainer {...{ posts, setPosts, error }} />
                  </NotificationMessagesWrapper>
                </NotificationsWrapper>
              )
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

        {posts && (
          <Route
            path="/p/:id"
            element={<PostDetails {...{ posts, setPosts, isLoading }} />}
          />
        )}
        <Route path="/edit" element={<EditInfo />} />
        {userContext?.user && (
          <Route path="/inbox" element={<ChatContainer />} />
        )}
        {/* <Route path="notifications" element={<NotificationsContainer />} /> */}
      </Routes>
    </div>
  );
}

export default App;
