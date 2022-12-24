import './App.css';
import { useEffect } from 'react';
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

function App() {
  const userContext = useUserContenxt();
  const { posts, getPosts, error, isLoading, setPosts } = useGetPosts();

  useEffect(() => {
    getPosts();
  }, [userContext?.user?.username]);

  return (
    <div
      className={`${
        userContext?.user ? 'flex bg-stone-50 justify-center min-h-screen' : ''
      }`}
    >
      {userContext?.user && <NavigationBar {...{ setPosts }} />}

      <Routes>
        <Route
          path="/"
          element={
            userContext?.user ? (
              posts && <FeedContainer {...{ posts, setPosts, error }} />
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
          element={userContext?.user && <Profile />}
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
        <Route path="notifications" element={<NotificationsContainer />} />
      </Routes>
    </div>
  );
}

export default App;
