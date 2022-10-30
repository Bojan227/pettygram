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
    <div>
      <h2>
        Already have an account{' '}
        <Link to="login">
          <span>Sign in</span>
        </Link>
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        Username
        <TextField
          className={'bg-[#e1306c] rounded-lg p-2 sm:w-3/5 w-5/6'}
          value={username}
          onChange={(username) => setUsername(username)}
        />
        Password
        <input
          type="password"
          className={'bg-[#e1306c] rounded-lg p-2 sm:w-3/5 w-5/6'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        First Name
        <TextField
          className={'bg-[#e1306c] rounded-lg p-2 sm:w-3/5 w-5/6'}
          value={firstName}
          onChange={(firstname) => setFirstName(firstname)}
        />
        Last Name
        <TextField
          className={'bg-[#e1306c] rounded-lg p-2 sm:w-3/5 w-5/6'}
          value={lastName}
          onChange={(lastName) => setLastName(lastName)}
        />
        Upload Profile Picture
        <input type="file" name="img" onChange={(e) => handleImageUpload(e)} />
        <button type="submit">Sign up</button>
      </form>
      {error && <h5>{error}</h5>}
      {message && <h5>{message}</h5>}
    </div>
  );
}
