import { useState } from 'react';
import fetcher from '../api/fetcher';

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
      console.log(reader.result);
      uploadWithImage(reader.result);
    };

    const uploadWithImage = async (img: string) => {
      try {
        const json = await fetcher('http://localhost:4000/user/signup', {
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
