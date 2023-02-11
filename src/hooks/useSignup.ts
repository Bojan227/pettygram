import { useState } from 'react';
import fetcher from '../api/fetcher';
import { url } from '../constants/api';

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

    if (!image) {
      setError('You must provide an image');
      return;
    }

    const reader: any = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      uploadWithImage(reader.result);
    };

    const uploadWithImage = async (img: string) => {
      try {
        const json = await fetcher(`${url}/user/signup`, {
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

        if (json.error) {
          setError(json.error);
        }

        setMessage(json.message);
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
