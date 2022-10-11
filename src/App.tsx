import './App.css';
import { useEffect } from 'react';
import { FeedContainer } from './components/feed/FeedContainer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from './components/navigation/NavigationBar';
import Signup from './components/Signup';
import Login from './components/Login';
import useUserContenxt from './hooks/useUserContext';

function App() {
  const userContext = useUserContenxt();

  console.log(userContext?.user);
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
      </Routes>
    </div>
  );
}

export default App;
