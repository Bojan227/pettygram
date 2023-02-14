import TextField from './TextField';
import { useState } from 'react';
import useLogin from '../hooks/useLogin';
import instagramLogo from './navigation/images/instagram-text-icon.png';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

export default function Login() {
  const { login, isLoading, error } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen 
    bg-gradient-to-b from-[#405DE6] via-[#5851DB] to-[#FD1D1D] "
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center text-white gap-2 grow"
      >
        <img src={instagramLogo} className="my-8" />
        <h1>Username</h1>
        <TextField
          className={'bg-[#e1306c] rounded-lg p-2 sm:w-3/5 w-5/6'}
          value={username}
          onChange={(username) => setUsername(username)}
        />
        <h1>Password</h1>
        <input
          className="bg-[#e1306c] rounded-lg p-2 sm:w-3/5 w-5/6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={!username || !password}
          style={{
            color: `${
              !username || !password ? 'rgba(255,255,255, 0.3)' : 'white'
            }`,
          }}
          className="border border-white sm:w-3/5 w-5/6 p-2 my-4 rounded-lg"
        >
          Log In
        </button>
        {isLoading && <LoadingSpinner />}
        {error && <h2>{error}</h2>}
      </form>
      <footer className="border-solid border-t-2 border-white  p-5 w-full text-center text-white">
        <h1>
          Don't have an account?<Link to="/">Sign up</Link>
        </h1>
      </footer>
    </div>
  );
}
