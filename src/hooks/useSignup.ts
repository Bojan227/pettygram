import { useState } from 'react';

type SignupProps = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: File | null | Blob;
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

    const reader: any = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      uploadWithImage(reader.result);
    };

    const uploadWithImage = async (img: string) => {
      try {
        const res = await fetch('http://localhost:4000/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            firstName,
            lastName,
            image: img,
          }),
        });

        const json = await res.json();

        setMessage(json.message);
        setError('');
      } catch (err) {
        setError('Something went wrong');
        setMessage('');
      } finally {
        setIsLoading(false);
      }
    };
  };

  return {
    signup,
    isLoading,
    error,
    message,
  };
}
