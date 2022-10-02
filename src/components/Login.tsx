import TextField from './TextField';
import { useState } from 'react';
import useLogin from '../hooks/useLogin';

export default function Login() {
  const { login } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await login(username, password);
  };

  //   if (isLoading) {
  //     return <h1>Spinner .......</h1>;
  //   }

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
        <button type="submit">Login</button>
      </form>
      {/* {error && <h5>{error}</h5>}
      {message && <h5>{message}</h5>} */}
    </div>
  );
}
