import TextField from './TextField';
import useSignup from '../hooks/useSignup';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const { signup, isLoading, error, message } = useSignup();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signup({ username, password, firstName, lastName, image });
  };

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setImage(evt.target.files[0]);
    }
  };

  if (isLoading) {
    return <h1>Spinner .......</h1>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen 
      bg-gradient-to-b from-[#405DE6] via-[#5851DB] to-[#FD1D1D] "
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-1/3 justify-center items-center gap-6 grow text-white"
      >
        Username
        <TextField
          className={'bg-[#e1306c] rounded-lg p-2  w-full'}
          value={username}
          onChange={(username) => setUsername(username)}
        />
        Password
        <input
          type="password"
          className={'bg-[#e1306c] rounded-lg p-2 w-full'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        First Name
        <TextField
          className={'bg-[#e1306c] rounded-lg p-2  w-full'}
          value={firstName}
          onChange={(firstname) => setFirstName(firstname)}
        />
        Last Name
        <TextField
          className={'bg-[#e1306c] rounded-lg p-2  w-full'}
          value={lastName}
          onChange={(lastName) => setLastName(lastName)}
        />
        Upload Profile Picture
        <input
          onChange={(e) => handleImageUpload(e)}
          type="file"
          name="img"
          id="actual-btn"
          style={{ display: 'none' }}
        />
        <label htmlFor="actual-btn" className="bg-[#405de6]">
          Choose Image
        </label>
        <button
          type="submit"
          disabled={
            !username || !password || !firstName || !lastName || !image
              ? true
              : false
          }
          style={{
            color: `${
              !username || !password || !firstName || !lastName || !image
                ? 'rgba(255,255,255, 0.3)'
                : 'white'
            }`,
          }}
          className="border border-white  w-full p-2 my-4 rounded-lg"
        >
          Log In
        </button>
      </form>
      {error && <h5>{error}</h5>}
      {message && <h5>{message}</h5>}

      <footer className="border-solid border-t-2 border-white  p-5 w-full text-center text-white">
        <h1>
          Already have an account{' '}
          <Link to="login">
            <span>Sign in</span>
          </Link>
        </h1>
      </footer>
    </div>
  );
}
