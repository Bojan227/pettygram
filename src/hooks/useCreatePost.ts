import { useState } from 'react';

// type CreatePostProps = {
//   text: string | undefined;
//   image: {};
// };

export default function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const createpost = async (text: string, image: File) => {
    console.log(document.cookie.split('=')[1]);
    setIsLoading(true);

    const reader: any = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      console.log(reader.result);
      uploadWithImage(reader.result);
    };

    const uploadWithImage = async (img: string) => {
      try {
        const res = await fetch('http://localhost:4000/posts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${document.cookie.split('=')[1]}`,
          },
          body: JSON.stringify({
            text,
            image: img,
          }),
        });

        const json = await res.json();

        console.log(json);
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
    createpost,
    isLoading,
    error,
    message,
  };
}
