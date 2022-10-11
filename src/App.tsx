import './App.css';
import { useEffect } from 'react';
import { FeedContainer } from './components/feed/FeedContainer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from './components/navigation/NavigationBar';
import { Profile } from './components/profile/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import useUserContenxt from './hooks/useUserContext';

function App() {
  const userContext = useUserContenxt();

  return (
    <div className="App">
      {userContext?.user && <NavigationBar />}

      <Routes>
        <Route
          path="/"
          element={userContext?.user ? <FeedContainer /> : <Signup />}
        />
        <Route
          path="login"
          element={userContext?.user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="profile" element={userContext?.user && <Profile />} />
      </Routes>
    </div>
  );
}

export default App;
