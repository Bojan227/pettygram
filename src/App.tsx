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
import { PostDetails } from './components/postDetails/PostDetails';

function App() {
  const userContext = useUserContenxt();
  const { posts, getPosts, error, isLoading, setPosts } = useGetPosts();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex bg-stone-50 justify-center">
      {userContext?.user && <NavigationBar />}

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
        <Route path="profile" element={userContext?.user && <Profile />} />

        {posts && (
          <Route
            path="/p/:id"
            element={<PostDetails {...{ posts, setPosts, isLoading }} />}
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
