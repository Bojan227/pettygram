import { FormEvent, useEffect, useState } from 'react';
import useUserContext from '../../hooks/useUserContext';
import TextField from '../TextField';
import useEditInfo from '../../hooks/useEditInfo';
import { Navigate } from 'react-router-dom';

export const EditInfo = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const userContext = useUserContext();
  const { editInfo, error, isLoading, message } = useEditInfo();

  useEffect(() => {
    setUsername(userContext?.user.username!);
    setFirstName(userContext?.user.firstName!);
    setLastName(userContext?.user.lastName!);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await editInfo(username, firstName, lastName);
  }
  if (isLoading) <h1>Loading....</h1>;

  return (
    <div>
      <h3>{error}</h3>
      <form className="edit-form" onSubmit={handleSubmit}>
        Username
        <TextField
          className="username"
          value={username}
          onChange={(username) => setUsername(username)}
        />
        First Name
        <TextField
          className="fistName"
          value={firstName}
          onChange={(firstName) => setFirstName(firstName)}
        />
        Last Name
        <TextField
          className="lastName"
          value={lastName}
          onChange={(lastName) => setLastName(lastName)}
        />
        <button>Edit Information</button>
      </form>
      {message && <Navigate to={`/profile/${userContext?.user._id}`} />}
    </div>
  );
};
