import TextField from './TextField';
import useSignup from '../hooks/useSignup';
import { useState } from 'react';

export default function Signup() {
  const { signup, isLoading, error, message } = useSignup();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await signup({ username, password, firstName, lastName, image });
  };

  if (isLoading) {
    return <h1>Spinner .......</h1>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Username
        <TextField
          value={username}
          onChange={(username) => setUsername(username)}
        />
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        First Name
        <TextField
          value={firstName}
          onChange={(firstname) => setFirstName(firstname)}
        />
        Last Name
        <TextField
          value={lastName}
          onChange={(lastName) => setLastName(lastName)}
        />
        <button type="submit">Sign up</button>
      </form>
      {error && <h5>{error}</h5>}
      {message && <h5>{message}</h5>}
    </div>
  );
}
