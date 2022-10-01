import { useState } from 'react';

type SignupProps = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
};

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const signup = async ({
    username,
    password,
    firstName,
    lastName,
    image,
  }: SignupProps) => {
    setIsLoading(true);

    try {
      const res = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          firstName,
          lastName,
          image,
        }),
      });

      const json = await res.json();

      setMessage(json.message);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
    error,
    message,
  };
}
